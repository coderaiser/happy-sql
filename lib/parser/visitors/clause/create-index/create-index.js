import {types} from '@putout/babel';

const {identifier, callExpression} = types;

const convertColumns = (columns) => {
    const {items} = columns.expr;
    const cols = [];
    
    for (const item of items)
        cols.push(identifier(item.expr.name));
    
    return cols;
};

export const convertCreateIndex = (stmt) => {
    const {
        name,
        table,
        columns,
    } = stmt;
    const isUnique = stmt.indexTypeKw && stmt.indexTypeKw.name === 'UNIQUE';
    
    return callExpression(identifier(isUnique ? 'createUniqueIndex' : 'createIndex'), [
        identifier(name.name),
        identifier(table.name),
        ...convertColumns(columns),
    ]);
};
