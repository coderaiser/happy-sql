export const max = (path, {write, traverse}) => {
    write('MAX(');
    traverse(path.get('arguments')[0]);
    write(')');
};
