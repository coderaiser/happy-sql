export const indexedBy = (path, {write, traverse}) => {
    const [table, index] = path.get('arguments');

    traverse(table);
    write(' INDEXED BY ');
    traverse(index);
};