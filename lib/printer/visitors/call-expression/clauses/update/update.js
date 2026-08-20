export const update = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [table] = args;
    const [, set] = args;
    const where = args[2];
    
    write('UPDATE ');
    traverse(table);
    write.newline();
    traverse(set);
    
    if (where) {
        write.newline();
        traverse(where);
    }
};
