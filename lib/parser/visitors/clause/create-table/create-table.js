import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';
import {convertClause} from '#parser/clause';
import {convertTableConstraint} from '../table-constraint.js';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const isAsClause = ({type}) => type === 'as_clause';
const isVirtual = (stmt) => stmt.kind && stmt.kind.kindKw.name === 'VIRTUAL';
const isColumnDefinition = ({type}) => type === 'column_definition';
const isTemp = (stmt) => stmt.kind && ['TEMP', 'TEMPORARY'].includes(stmt.kind.kindKw.name);

const convertColumnListItem = (item) => {
    if (isColumnDefinition(item))
        return convertColumnDefinition(item);
    
    return convertTableConstraint(item);
};

const isWithoutName = ({name}) => name === 'WITHOUT';
const isWithoutKeyword = ({name}) => Array.isArray(name) && name.some(isWithoutName);
const isWithoutRowid = (options) => options && options.items.some(isWithoutKeyword);

const convertTableArgs = (stmt) => {
    const colNodes = [];
    
    for (const item of stmt.columns.expr.items)
        colNodes.push(convertColumnListItem(item));
    
    if (isWithoutRowid(stmt.options))
        colNodes.push(callExpression(identifier('withoutRowid'), []));
    
    return [
        identifier(stmt.name.name),
        arrayExpression(colNodes),
    ];
};

const convertUsing = ({module}) => {
    const args = [];
    
    for (const item of module.args.expr.args.items)
        args.push(identifier(item.name));
    
    return callExpression(identifier(module.name.name), args);
};

export const convertCreateTable = (stmt) => {
    if (isVirtual(stmt)) {
        const [usingClause] = stmt.clauses;
        
        return callExpression(identifier('createVirtualTable'), [
            identifier(stmt.name.name),
            convertUsing(usingClause),
        ]);
    }
    
    const asClause = stmt.clauses && stmt.clauses.find(isAsClause);
    
    if (asClause)
        return callExpression(identifier('createTableAs'), [
            identifier(stmt.name.name),
            convertClause(asClause.expr),
        ]);
    
    const fnName = isTemp(stmt) ? 'createTempTable' : 'createTable';
    const tableArgs = convertTableArgs(stmt);
    
    if (stmt.ifNotExistsKw)
        return callExpression(identifier(`${fnName}IfNotExists`), tableArgs);
    
    return callExpression(identifier(fnName), tableArgs);
};
