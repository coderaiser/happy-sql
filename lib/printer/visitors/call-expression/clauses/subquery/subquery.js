export const subquery = (path, {write, traverse}) => {
    write('(');
    traverse(path.get('arguments')[0]);
    write(')');
};
