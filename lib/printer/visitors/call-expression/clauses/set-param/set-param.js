export const setParam = (path, {write, traverse}) => {
    const [name, ...values] = path.get('arguments');
    
    write('SET ');
    traverse(name);
    write(' TO ');
    
    for (const [i, value] of values.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(value);
    }
};
