export const values = (path, {write, traverse}) => {
    const args = path.get('arguments');
    write('VALUES (');
    for (let i = 0; i < args.length; i++) {
        if (i > 0)
            write(', ');
        
        traverse(args[i]);
    }
    
    write(')');
};
