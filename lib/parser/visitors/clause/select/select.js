import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertFrom} from '#parser/clause/from';
import {convertCount, isCount} from '#parser/clause/count';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
    callExpression,
    memberExpression,
    numericLiteral,
    binaryExpression,
} = types;

const convertColumn = (column) => {
    if (isCount(column))
        return convertCount(column);
    
    if (column.type === 'func_call')
        return convertFuncCall(column);
    
    if (column.type === 'alias')
        return tsAsExpression(convertOperand(column.expr), tsLiteralType(stringLiteral(column.alias.name)));
    
    if (column.type === 'string_literal')
        return stringLiteral(column.value);
    
    if (column.type === 'member_expr')
        return memberExpression(identifier(column.object.name), identifier(column.property.name));
    
    if (column.type === 'parameter')
        return stringLiteral(column.text);
    
    if (column.type === 'number_literal')
        return numericLiteral(column.value);
    
    if (column.type === 'binary_expr')
        return binaryExpression(
            column.operator,
            convertOperand(column.left),
            convertOperand(column.right),
        );
    
    return identifier(column.name);
};

const AGGREGATE_NAMES = new Set(['sum', 'avg', 'min', 'max']);

const convertFuncCall = (column) => {
    const {name} = column.name;
    const lower = name.toLowerCase();
    
    if (name === 'last_insert_rowid')
        return callExpression(identifier('lastInsertRowid'), []);
    
    if (name === 'lastval')
        return callExpression(identifier('lastval'), []);
    
    if (AGGREGATE_NAMES.has(lower)) {
        const items = column.args.expr.args.items;
        const args = items.map(convertOperand);
        
        return callExpression(identifier(lower), args);
    }
    
    return callExpression(identifier(name), []);
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
    const selectArgs = isDistinct(selectClause)
        ? [callExpression(identifier('distinct'), cols)]
        : cols;
    
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
