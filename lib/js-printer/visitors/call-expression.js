const CLAUSE_NAMES = new Set([
    'select',
    'from',
    'where',
    'join',
    'on',
]);

export const CallExpression = (path, {write, traverse, indent}) => {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    if (!CLAUSE_NAMES.has(name)) {
        write(name);
        write('(');
        
        for (const [i, arg] of args.entries()) {
            traverse(arg);
            
            if (i < args.length - 1) {
                write(',');
                write(' ');
            }
        }
        
        write(')');
        
        return;
    }
    
    write(`${name}(`);
    indent.inc();
    
    for (const [i, arg] of args.entries()) {
        write.breakline();
        traverse(arg);
        
        if (i < args.length - 1)
            write(',');
    }
    
    indent.dec();
    write.breakline();
    write(')');
};
