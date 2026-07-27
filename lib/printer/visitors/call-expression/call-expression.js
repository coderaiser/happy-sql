import {clauses} from './clauses/clauses.js';

export const CallExpression = (path, printer) => {
    const {name} = path.node.callee;
    const visit = clauses[name];
    
    if (!visit)
        throw Error(`${name} not supported yet`);
    
    visit(path, printer);
};
