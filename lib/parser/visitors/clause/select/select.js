import {types} from '@putout/babel';
import {convertFrom} from '#parser/clause/from';
import {convertWhere} from '#parser/clause/where';
import {convertOperand} from '#parser/operand';

const {
    identifier,
    stringLiteral,
    assignmentExpression,
    callExpression,
} = types;

const findClause = (clauses, type) => clauses.find((c) => c.type === type);

const convertColumn = (col) => {
    if (col.type === 'alias')
        return assignmentExpression('=', identifier(col.alias.name), convertOperand(col.expr));
    
    return identifier(col.name);
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
