const isAssignment = (arg) => arg.node.type === 'AssignmentExpression';

export const withNamed = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const namedQueries = args.filter(isAssignment);
    const finalStatement = args[args.length - 1];
    
    write('WITH ');
    
    for (const [i, query] of namedQueries.entries()) {
        write(query.get('left').node.name);
        write(' AS (\n');
        traverse(query.get('right'));
        
        if (i < namedQueries.length - 1)
            write('\n    ),\n');
    }
    
    traverse(finalStatement);
};