export const tuple = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('(');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
