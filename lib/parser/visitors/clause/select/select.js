import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertFrom} from '#parser/clause/from';
import {convertWhere} from '#parser/clause/where';
import {findClause} from '#parser/clause/find';
import {convertCount, isCount} from '#parser/clause/count';

const {
    identifier,
    stringLiteral,
    assignmentExpression,
    callExpression,
} = types;

const convertColumn = (column) => {
    if (isCount(column))
        return convertCount(column);
    
    if (column.type === 'alias')
        return assignmentExpression('=', identifier(column.alias.name), convertOperand(column.expr));
    
    return identifier(column.name);
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
        convertFrom(fromClause),
        whereClause && convertWhere(whereClause),
    ].filter(Boolean);
    
    return callExpression(identifier('select'), args);
};
