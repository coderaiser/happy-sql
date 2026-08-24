export const createUniqueIndex = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('CREATE UNIQUE INDEX ');
    traverse(args[0]);
    write(' ON ');
    traverse(args[1]);
    write(' (');
    
    for (const [i, arg] of args.slice(2).entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
