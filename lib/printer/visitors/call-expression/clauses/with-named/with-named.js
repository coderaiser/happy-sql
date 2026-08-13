const isAssignment = (arg) => arg.node.type === 'AssignmentExpression';

export const withNamed = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const namedQueries = args.filter(isAssignment);
    const finalStatement = args.at(-1);
    
    write('WITH\n');
    const last = namedQueries.length - 1;
    
    for (const [i, query] of namedQueries.entries()) {
        write('    ');
        write(query.get('left').node.name);
        write(' AS (\n        ');
        traverse(query.get('right'));
        write('\n    )');
        write(i < last ? ',\n' : '\n');
    }
    
    traverse(finalStatement);
};
