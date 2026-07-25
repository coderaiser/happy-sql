export const LogicalExpression = (path, {write, traverse}) => {
    const op = path.node.operator === '&&' ? 'AND' : 'OR';
    traverse(path.get('left'));
    write(`\n${op} `);
    traverse(path.get('right'));
};
