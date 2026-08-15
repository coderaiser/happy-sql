export const MemberExpression = (path, {write, traverse}) => {
    traverse(path.get('object'));
    write('.');
    traverse(path.get('property'));
};
