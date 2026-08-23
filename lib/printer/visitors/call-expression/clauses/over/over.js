export const over = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [func] = args;
    const clauses = args.slice(1);
    
    traverse(func);
    write(' OVER (');
    
    for (const [i, clause] of clauses.entries()) {
        if (i > 0)
            write(' ');
        
        traverse(clause);
    }
    
    write(')');
};
