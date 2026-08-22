export const orderBy = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('ORDER BY ');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
