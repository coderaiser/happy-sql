export const alterTable = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [table] = args;
    
    write('ALTER TABLE ');
    traverse(table);
    
    for (const arg of args.slice(1)) {
        write.newline();
        traverse(arg);
    }
};
