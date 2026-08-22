export const sum = (path, {write, traverse}) => {
    write('SUM(');
    traverse(path.get('arguments')[0]);
    write(')');
};
