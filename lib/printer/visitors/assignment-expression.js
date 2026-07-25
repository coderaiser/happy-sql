export const AssignmentExpression = (path, {write, traverse}) => {
    traverse(path.get('right'));
    write(' AS ');
    traverse(path.get('left'));
};
