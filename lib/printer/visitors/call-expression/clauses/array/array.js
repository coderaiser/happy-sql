export const array = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('ARRAY[');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(']');
};
