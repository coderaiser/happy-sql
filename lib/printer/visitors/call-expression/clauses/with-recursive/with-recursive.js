const isStringLiteral = ({type}) => type === 'StringLiteral';

export const withRecursive = (path, {write, indent, traverse}) => {
    const args = path.get('arguments');
    const ctes = args.slice(0, -1);
    const finalStatement = args.at(-1);
    
    write('WITH RECURSIVE');
    write.newline();
    
    const last = ctes.length - 1;
    
    for (const [i, cte] of ctes.entries()) {
        const name = cte.node.callee.name;
        const cteArgs = cte.get('arguments');
        const colArgs = cteArgs.filter(isStringLiteral);
        
        indent.inc();
        write.indent();
        indent.dec();
        write(name);
        
        if (colArgs.length) {
            write('(');
            
            for (const [j, col] of colArgs.entries()) {
                if (j > 0)
                    write(', ');
                
                write(col.node.value);
            }
            
            write(')');
        }
        
        write(' AS (');
        write.newline();
        indent.inc();
        indent.inc();
        write.indent();
        traverse(cteArgs.at(-1));
        indent.dec();
        indent.dec();
        write.newline();
        indent.inc();
        write.indent();
        indent.dec();
        write(')');
        
        if (i < last)
            write(',');
        
        write.newline();
    }
    
    traverse(finalStatement);
};
