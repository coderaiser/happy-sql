export const min = (path, {write, traverse}) => {
    write('MIN(');
    traverse(path.get('arguments')[0]);
    write(')');
};
