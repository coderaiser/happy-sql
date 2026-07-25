export const BinaryExpression = (path, {write, traverse}) => {
    traverse(path.get('left'));
    write(' = ');
    traverse(path.get('right'));
};
