export const into = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const table = args[0];
    const columns = args[1];
    const values = args[2];

    write('INSERT INTO ');
    traverse(table);
    write(' (');
    if (columns.node.type === 'ArrayExpression') {
        const colArgs = columns.get('elements');
        for (let i = 0; i < colArgs.length; i++) {
            if (i > 0) write(', ');
            traverse(colArgs[i]);
        }
    } else {
        traverse(columns);
    }
    write(') ');
    traverse(values);
};
