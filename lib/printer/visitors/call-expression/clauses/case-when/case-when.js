const isElseClause = (path) => {
    const {callee} = path.node;
    
    return callee && callee.name === 'else_';
};

export const caseWhen = (path, printer) => {
    const {write} = printer;
    const args = path.get('arguments');
    const lastArg = args.at(-1);
    const hasElse = isElseClause(lastArg);
    
    write('CASE ');
    
    for (let i = 0; i < args.length - 1; i += 2) {
        write('WHEN ');
        printer.traverse(args[i]);
        write(' THEN ');
        printer.traverse(args[i + 1]);
        
        // space between clauses / before ELSE — but not trailing
        if (i < args.length - 3)
            write(' ');
    }
    
    if (hasElse) {
        write(' ');
        write('ELSE ');
        printer.traverse(lastArg.get('arguments')[0]);
    }
    
    write(' END');
};
