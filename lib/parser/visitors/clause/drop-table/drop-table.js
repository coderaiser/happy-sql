import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertDropTable = (stmt) => {
    const tableArgs = [];
    
    for (const table of stmt.tables.items)
        tableArgs.push(identifier(table.name));
    
    if (stmt.ifExistsKw)
        return callExpression(identifier('dropTable'), [
            callExpression(identifier('ifExists'), []),
            ...tableArgs,
        ]);
    
    return callExpression(identifier('dropTable'), tableArgs);
};
