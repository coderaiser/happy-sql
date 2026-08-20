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
    
    return identifier(column.name);
};

const convertFuncCall = (column) => {
    const {name} = column.name;
    
    if (name === 'last_insert_rowid')
        return callExpression(identifier('lastInsertRowid'), []);
    
    return callExpression(identifier('lastval'), []);
};

const convertColumns = (columns) => {
    if (columns.items.length === 1 && columns.items[0].type === 'all_columns')
        return [
            stringLiteral('*'),
        ];
    
    return columns.items.map(convertColumn);
};

export const convertSelect = ({clauses}) => {
    const selectClause = findClause(clauses, 'select_clause');
    const fromClause = findClause(clauses, 'from_clause');
    const whereClause = findClause(clauses, 'where_clause');
    
    const args = [
        ...convertColumns(selectClause.columns),
        fromClause && convertFrom({
            expr: fromClause.expr,
            whereClause,
        }),
    ].filter(Boolean);
    
    return callExpression(identifier('select'), args);
};
