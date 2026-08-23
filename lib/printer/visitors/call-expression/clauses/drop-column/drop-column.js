export const dropColumn = (path, {write, traverse}) => {
    write('DROP COLUMN ');
    traverse(path.get('arguments')[0]);
};
