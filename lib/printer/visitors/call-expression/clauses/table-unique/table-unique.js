export const tableUnique = (path, {write, traverse}) => {
    write('UNIQUE (');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
