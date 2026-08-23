export const partitionBy = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('PARTITION BY ');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
