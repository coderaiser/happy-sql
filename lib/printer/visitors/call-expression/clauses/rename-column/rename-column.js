export const renameColumn = (path, {write, traverse}) => {
    const [from, to] = path.get('arguments');
    
    write('RENAME COLUMN ');
    traverse(from);
    write(' TO ');
    traverse(to);
};
