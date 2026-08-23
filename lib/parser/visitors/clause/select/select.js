import {types} from '@putout/babel';
import toCamel from 'just-camel-case';
import {
    convertOperand,
    convertMemberExpr,
} from '#parser/clause/operand';
import {convertFrom} from '#parser/clause/from';
import {convertCount, isCount} from '#parser/clause/count';
import {convertCaseWhen} from '#parser/clause/case-when';
import {convertBinary} from '#parser/clause/binary';
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

const convertColumn = (column) => {
    if (isCount(column))
        return convertCount(column);
    
    if (column.type === 'func_call')
        return convertFuncCall(column);
    
    if (column.type === 'cast_expr')
        return convertCast(column);
    
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
    
    return identifier(column.name);
};

const AGGREGATE_NAMES = new Set([
    'sum',
    'avg',
    'min',
    'max',
]);

const convertOverClause = (over) => {
    const result = [];
    const {partitionBy, orderBy} = over.window.expr;
    
    if (partitionBy)
        result.push(callExpression(identifier('partitionBy'), partitionBy.specifications.items.map(convertOperand)));
    
    if (orderBy)
        result.push(convertOrderBy(orderBy));
    
    return result;
};

const convertOver = (column, fnNode) => callExpression(identifier('over'), [
    fnNode,
    ...convertOverClause(column.over),
]);

const convertFuncCall = (column) => {
    const {name} = column.name;
    const lower = name.toLowerCase();
    
    if (name === 'last_insert_rowid')
        return callExpression(identifier('lastInsertRowid'), []);
    
    if (name === 'lastval')
        return callExpression(identifier('lastval'), []);
    
    const {items} = column.args.expr.args;
    const args = [];
    
    for (const item of items)
        args.push(convertOperand(item));
    
    if (column.over)
        return convertOver(column, callExpression(identifier(toCamel(name)), args));
    
    if (AGGREGATE_NAMES.has(lower))
        return callExpression(identifier(lower), args);
    
    // generic func_call — preserve args via convertOperand
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

export const convertSelect = ({clauses}) => {
    const selectClause = findClause(clauses, 'select_clause');
    const fromClause = findClause(clauses, 'from_clause');
    const whereClause = findClause(clauses, 'where_clause');
    const groupByClause = findClause(clauses, 'group_by_clause');
    const havingClause = findClause(clauses, 'having_clause');
    const orderByClause = findClause(clauses, 'order_by_clause');
    const limitClause = findClause(clauses, 'limit_clause');
    
    const cols = convertColumns(selectClause.columns);
    const selectArgs = isDistinct(selectClause) ? [
        callExpression(identifier('distinct'), cols),
    ] : cols;
    
    const args = [
        ...selectArgs,
        fromClause && convertFrom({
            expr: fromClause.expr,
            whereClause,
            groupByClause,
            havingClause,
            orderByClause,
            limitClause,
        }),
    ].filter(Boolean);
    
    return callExpression(identifier('select'), args);
};
