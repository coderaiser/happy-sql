import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertDropView = (stmt) => {
    const args = [];
    
    for (const view of stmt.views.items)
        args.push(identifier(view.name));
    
    return callExpression(identifier('dropView'), args);
};
