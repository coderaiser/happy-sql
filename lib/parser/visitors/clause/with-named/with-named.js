import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    assignmentExpression,
    callExpression,
} = types;

const convertTable = ({table, expr}) => {
    return assignmentExpression('=', identifier(table.name), convertClause(expr.expr));
};

export const convertWithNamed = (stmt) => {
    const withClause = findClause(stmt.clauses, 'with_clause');
    
    const finalStatement = convertClause({
        ...stmt,
        clauses: stmt.clauses.filter((clause) => clause.type !== 'with_clause'),
    });
    
    const args = [
        ...withClause.tables.items.map(convertTable),
        finalStatement,
    ];
    
    return callExpression(identifier('withNamed'), args);
};
