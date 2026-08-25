export const using = (path, {write, traverse}) => {
    write('USING (');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
