export const notExists = (path, {write, traverse}) => {
    write('NOT EXISTS (');
    traverse(path.get('arguments')[0]);
    write(')');
};