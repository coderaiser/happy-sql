export const reindex = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('REINDEX');
    
    if (args.length) {
        write.space();
        traverse(args[0]);
    }
};
