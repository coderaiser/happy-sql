export const tablePrimaryKey = (path, {write, traverse}) => {
    write('PRIMARY KEY (');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};
