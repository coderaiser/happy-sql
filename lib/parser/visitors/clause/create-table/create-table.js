import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';
import {convertClause} from '#parser/clause';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const isAsClause = ({type}) => type === 'as_clause';
const isVirtual = (stmt) => stmt.kind && stmt.kind.kindKw.name === 'VIRTUAL';

const convertUsing = (usingClause) => {
    const {module} = usingClause;
    const args = [];
    
    for (const item of module.args.expr.args.items)
        args.push(identifier(item.name));
    
    return callExpression(identifier(module.name.name), args);
};

export const convertCreateTable = (stmt) => {
    if (isVirtual(stmt)) {
        const usingClause = stmt.clauses[0];
        
        return callExpression(identifier('createVirtualTable'), [
            identifier(stmt.name.name),
            convertUsing(usingClause),
        ]);
    }
    
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
