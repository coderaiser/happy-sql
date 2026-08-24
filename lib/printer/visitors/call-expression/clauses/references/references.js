export const references = (path, {write, traverse}) => {
    write('REFERENCES ');
    const [first, ...other] = path.get('arguments');
    
    traverse(first);
    
    write('(');
    
    for (const [i, arg] of other.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
