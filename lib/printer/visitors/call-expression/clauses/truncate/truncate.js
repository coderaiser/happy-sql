export const truncate = (path, {write, traverse}) => {
    write('TRUNCATE TABLE ');
    
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
