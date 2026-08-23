export const update = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [table] = args;
    const [, set] = args;
    
    write('UPDATE ');
    traverse(table);
    write.newline();
    traverse(set);
    
    for (const arg of args.slice(2)) {
        write.newline();
        traverse(arg);
    }
};
