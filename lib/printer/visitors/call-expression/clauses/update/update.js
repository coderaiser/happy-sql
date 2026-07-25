export const update = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const table = args[0];
    const set = args[1];
    const where = args[2];

    write('UPDATE ');
    traverse(table);
    write('\n');
    traverse(set);
    if (where) {
        write('\n');
        traverse(where);
    }
};
