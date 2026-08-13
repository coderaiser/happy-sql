export const returning = (path, {write, traverse}) => {
    write('RETURNING ');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
