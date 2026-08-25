export const namedWindow = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('WINDOW ');
    traverse(args[0]);
    write(' AS (');
    
    for (let i = 1; i < args.length; i++) {
        if (i > 1)
            write(' ');
        
        traverse(args[i]);
    }
    
    write(')');
};

