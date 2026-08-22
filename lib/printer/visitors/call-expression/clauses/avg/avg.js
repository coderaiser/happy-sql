export const avg = (path, {write, traverse}) => {
    write('AVG(');
    traverse(path.get('arguments')[0]);
    write(')');
};
