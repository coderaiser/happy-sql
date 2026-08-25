export const constraint = (path, {write, traverse}) => {
    write('CONSTRAINT ');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i)
            write(' ');
        
        traverse(arg);
    }
};
