export const into = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [table] = args;
    const [, columns] = args;
    const values = args[2];
    
    write('INSERT INTO ');
    traverse(table);
    write(' (');
    
    if (columns.node.type === 'ArrayExpression') {
        const colArgs = columns.get('elements');
        
        for (let i = 0; i < colArgs.length; i++) {
            if (i > 0)
                write(', ');
            
            traverse(colArgs[i]);
        }
    } else {
        traverse(columns);
    }
    
    write(')');
    
    if (values) {
        write('\n');
        traverse(values);
    }
};
