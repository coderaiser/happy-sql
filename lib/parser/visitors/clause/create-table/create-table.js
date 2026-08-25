import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';
import {convertClause} from '#parser/clause';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const isAsClause = ({type}) => type === 'as_clause';

export const convertCreateTable = (stmt) => {
    const {
        name,
        columns,
        ifNotExistsKw,
        clauses,
    } = stmt;
    const asClause = clauses?.find(isAsClause);
    
    if (asClause)
        return callExpression(identifier('createTableAs'), [
            identifier(name.name),
            convertClause(asClause.expr),
        ]);
    
    const colNodes = columns.expr.items.map(convertColumnDefinition);
    
    const tableArgs = [
        identifier(name.name),
        arrayExpression(colNodes),
    ];
    
    if (ifNotExistsKw)
        return callExpression(identifier('createTableIfNotExists'), tableArgs);
    
    return callExpression(identifier('createTable'), tableArgs);
};
