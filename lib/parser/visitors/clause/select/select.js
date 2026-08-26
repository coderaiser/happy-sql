import {types} from '@putout/babel';
import {
    convertOperand,
    convertMemberExpr,
} from '#parser/clause/operand';
import {convertFrom} from '#parser/clause/from';
import {convertCount, isCount} from '#parser/clause/count';
import {convertCaseWhen} from '#parser/clause/case-when';
import {convertBinary} from '#parser/clause/binary';
import {
    convertCondition,
    convertBetween,
} from '#parser/clause/where';
import {findClause} from '#parser/clause/find';
import {convertOrderBy} from '../from/order-by.js';

const isString = (a) => typeof a === 'string';

const {
    identifier,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
    callExpression,
    numericLiteral,
    booleanLiteral,
    nullLiteral,
} = types;

const getTypeName = ({name}) => {
    if (isString(name))
        return name;
    
    return name.name;
};

const convertCast = (column) => {
    const {expr, dataType} = column.args.expr;
    
    return callExpression(identifier('cast'), [
        convertOperand(expr),
        identifier(getTypeName(dataType)),
    ]);
};

const convertExtract = (column) => {
    const {unit, expr} = column.args.expr;
    
    return callExpression(identifier('extract'), [
        identifier(unit.unitKw.name),
        convertOperand(expr),
    ]);
};

const convertFilter = (column, fn) => {
    if (!column.filter)
        return fn;
    
    const {where} = column.filter;
    const condition = convertCondition(where.expr.expr);
    
    return callExpression(identifier('filter'), [fn, condition]);
};

const convertColumn = (column) => {
    if (isCount(column))
        return convertOverIfPresent(column, convertFilter(column, convertCount(column)));
    
    if (column.type === 'func_call')
        return convertFilter(column, convertFuncCall(column));
    
    if (column.type === 'cast_expr')
        return convertCast(column);
    
    if (column.type === 'cast_operator_expr')
        return convertOperand(column);
    
    if (column.type === 'extract_expr')
        return convertExtract(column);
    
    if (column.type === 'case_expr')
        return convertCaseWhen(column);
    
    if (column.type === 'alias')
        return tsAsExpression(convertOperand(column.expr), tsLiteralType(stringLiteral(column.alias.name)));
    
    if (column.type === 'string_literal')
        return stringLiteral(column.value);
    
    if (column.type === 'member_expr')
        return convertMemberExpr(column);
    
    if (column.type === 'parameter')
        return stringLiteral(column.text);
    
    if (column.type === 'number_literal')
        return numericLiteral(column.value);
    
    if (column.type === 'null_literal')
        return nullLiteral();
    
    if (column.type === 'boolean_literal')
        return booleanLiteral(column.value);
    
    if (column.type === 'binary_expr')
        return convertBinary(column);
    
    if (column.type === 'array_literal_expr')
        return convertOperand(column);
    
    if (column.type === 'prefix_op_expr')
        return convertOperand(column);
    
    if (column.type === 'postfix_op_expr')
        return convertCondition(column);
    
    if (column.type === 'between_expr')
        return convertBetween(column);
    
    // quoted identifier like "weird col" — keep original text
    if (isString(column.text) && column.text.startsWith('"'))
        return stringLiteral(column.text);
    
    return identifier(column.name);
};

const convertOverIfPresent = (column, fn) => {
    if (!column.over)
        return fn;
    
    return convertOver(column, fn);
};

const isWindowRef = (over) => over.window.type === 'identifier';

const convertFrameBound = (bound) => {
    if (bound.type === 'frame_bound_current_row')
        return callExpression(identifier('currentRow'), []);
    
    const name = bound.type === 'frame_bound_preceding' ? 'preceding' : 'following';
    const args = bound.expr ? [
        numericLiteral(bound.expr.value),
    ] : [];
    
    return callExpression(identifier(name), args);
};

const convertFrame = ({extent}) => callExpression(identifier('rowsBetween'), [
    convertFrameBound(extent.begin),
    convertFrameBound(extent.end),
]);

const convertOverClause = (over) => {
    if (isWindowRef(over))
        return [
            identifier(over.window.name),
        ];
    
    const result = [];
    const {
        partitionBy,
        orderBy,
        frame,
    } = over.window.expr;
    
    if (partitionBy)
        result.push(callExpression(identifier('partitionBy'), partitionBy.specifications.items.map(convertOperand)));
    
    if (orderBy)
        result.push(convertOrderBy(orderBy));
    
    if (frame)
        result.push(convertFrame(frame));
    
    return result;
};

const convertOver = (column, fnNode) => callExpression(identifier('over'), [
    fnNode,
    ...convertOverClause(column.over),
]);

const LOWERCASE_FUNCS = new Set([
    'sum',
    'avg',
    'min',
    'max',
    'count',
    'last_insert_rowid',
    'lastval',
]);

const convertFuncCall = (column) => {
    const {name} = column.name;
    const lower = name.toLowerCase();
    
    if (lower === 'last_insert_rowid')
        return callExpression(identifier('lastInsertRowid'), []);
    
    if (lower === 'lastval')
        return callExpression(identifier('lastval'), []);
    
    const {items} = column.args.expr.args;
    const args = [];
    
    for (const item of items)
        args.push(convertOperand(item));
    
    if (column.over)
        return convertOver(column, callExpression(identifier(LOWERCASE_FUNCS.has(lower) ? lower : name), args));
    
    if (LOWERCASE_FUNCS.has(lower))
        return callExpression(identifier(lower), args);
    
    // preserve original casing (RANK, LAG, LEAD, UPPER, etc.)
    return callExpression(identifier(name), args);
};

const convertColumns = (columns) => {
    if (columns.items.length === 1 && columns.items[0].type === 'all_columns')
        return [
            stringLiteral('*'),
        ];
    
    return columns.items.map(convertColumn);
};

const isDistinct = (selectClause) => selectClause.modifiers.some(({type}) => type === 'select_distinct');

const convertDistinctOn = ({modifiers}) => {
    if (!modifiers.some(({type}) => type === 'select_distinct_on'))
        return null;
    
    const modifier = modifiers.find(({type}) => type === 'select_distinct_on');
    const onCols = [];
    
    for (const item of modifier.columns.expr.items) {
        onCols.push(identifier(item.name));
    }
    
    return callExpression(identifier('distinctOn'), onCols);
};

const convertValuesRow = (node) => {
    const {items} = node.expr;
    
    return callExpression(identifier('row'), items.map(convertOperand));
};

const convertValuesClause = (clause) => callExpression(identifier('values'), clause.values.items.map(convertValuesRow));

export const convertSelect = ({clauses}) => {
    const selectClause = findClause(clauses, 'select_clause');
    const valuesClause = findClause(clauses, 'values_clause');
    
    if (!selectClause && valuesClause)
        return convertValuesClause(valuesClause);
    
    const fromClause = findClause(clauses, 'from_clause');
    const whereClause = findClause(clauses, 'where_clause');
    const groupByClause = findClause(clauses, 'group_by_clause');
    const havingClause = findClause(clauses, 'having_clause');
    const orderByClause = findClause(clauses, 'order_by_clause');
    const windowClause = findClause(clauses, 'window_clause');
    const limitClause = findClause(clauses, 'limit_clause');
    
    const cols = convertColumns(selectClause.columns);
    const distinctOn = convertDistinctOn(selectClause);
    const selectArgs = [];
    
    if (distinctOn)
        selectArgs.push(distinctOn);
    
    if (isDistinct(selectClause))
        selectArgs.push(callExpression(identifier('distinct'), cols));
    else
        selectArgs.push(...cols);
    
    const args = [
        ...selectArgs,
        fromClause && convertFrom({
            expr: fromClause.expr,
            whereClause,
            groupByClause,
            havingClause,
            orderByClause,
            windowClause,
            limitClause,
        }),
    ].filter(Boolean);
    
    return callExpression(identifier('select'), args);
};
