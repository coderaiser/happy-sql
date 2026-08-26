export const countDistinct = (path, {write, traverse}) => {
    write('COUNT(DISTINCT ');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
