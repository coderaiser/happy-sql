import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertDropIndex = (stmt) => {
    const args = [];
    
    for (const idx of stmt.indexes.items)
        args.push(identifier(idx.name));
    
    return callExpression(identifier('dropIndex'), args);
};
