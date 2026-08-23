export const addColumn = (path, {write, traverse}) => {
    write('ADD COLUMN ');
    traverse(path.get('arguments')[0]);
};
