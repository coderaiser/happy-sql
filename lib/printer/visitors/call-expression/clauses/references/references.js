export const references = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('REFERENCES ');
    traverse(args[0]);
    write('(');
    
    for (const [i, arg] of args
        .slice(1)
        .entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
