const isAssignment = (arg) => arg.node.type === 'AssignmentExpression';

export const withNamed = (path, {write, indent, traverse}) => {
    const args = path.get('arguments');
    const namedQueries = args.filter(isAssignment);
    const finalStatement = args.at(-1);
    
    write('WITH');
    write.newline();
    const last = namedQueries.length - 1;
    
    for (const [i, query] of namedQueries.entries()) {
        indent.inc();
        write.indent();
        indent.dec();
        write(query.get('left').node.name);
        write(' AS (');
        write.newline();
        indent.inc();
        indent.inc();
        write.indent();
        traverse(query.get('right'));
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
