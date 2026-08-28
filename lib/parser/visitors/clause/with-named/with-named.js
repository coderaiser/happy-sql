import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    assignmentExpression,
    callExpression,
    stringLiteral,
} = types;

const isWithClause = (clause) => clause.type !== 'with_clause';

const convertTable = ({table, expr}) => {
    return assignmentExpression('=', identifier(table.name), convertClause(expr.expr));
};

const convertColumn = (column) => stringLiteral(column.name);

const getColArgs = (columns) => {
    if (!columns)
        return [];
    
    const args = [];
    
    for (const col of columns.expr.items)
        args.push(convertColumn(col));
    
    return args;
};

// recursive CTE: numbers('value', unionAll(...))
const convertRecursiveTable = ({table, columns, expr}) => {
    const colArgs = getColArgs(columns);
    const body = convertClause(expr.expr);
    
    return callExpression(identifier(table.name), [...colArgs, body]);
};

export const convertWithNamed = (stmt) => {
    const withClause = findClause(stmt.clauses, 'with_clause');
    const isRecursive = Boolean(withClause.recursiveKw);
    const fnName = isRecursive ? 'withRecursive' : 'withNamed';
    
    const finalStatement = convertClause({
        ...stmt,
        clauses: stmt.clauses.filter(isWithClause),
    });
    
    const convertCte = isRecursive ? convertRecursiveTable : convertTable;
    
    const args = [
        ...withClause.tables.items.map(convertCte),
        finalStatement,
    ];
    
    return callExpression(identifier(fnName), args);
};
