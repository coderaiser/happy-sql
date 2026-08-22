import {clauses} from './clauses/clauses.js';

const printGenericCall = (path, {write, traverse}) => {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    write(name);
    write('(');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};

export const CallExpression = (path, printer) => {
    const {name} = path.node.callee;
    const visit = clauses[name];
    
    if (!visit)
        return printGenericCall(path, printer);
    
    visit(path, printer);
};
