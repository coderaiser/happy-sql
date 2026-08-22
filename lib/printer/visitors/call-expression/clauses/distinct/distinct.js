export const distinct = (path, {write, traverse}) => {
    write('DISTINCT ');
    
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
