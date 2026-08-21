export const LogicalExpression = (path, {write, traverse}) => {
    const left = path.get('left');
    const right = path.get('right');
    
    traverse(left);
    write.breakline();
    write(`${path.node.operator} `);
    traverse(right);
};
