export const renameTable = (path, {write, traverse}) => {
    write('RENAME TO ');
    traverse(path.get('arguments')[0]);
};
