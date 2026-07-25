import {clauses} from './clauses/clauses.js';

export const CallExpression = (path, printer) => {
    const {name} = path.node.callee;
    
    if (!clauses[name])
        throw Error(`${name} not supported yet`);
    
    clauses[name](path, printer);
};
