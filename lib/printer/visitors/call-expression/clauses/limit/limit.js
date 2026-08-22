export const limit = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('LIMIT ');
    traverse(args[0]);
    
    if (args.length > 1) {
        write.breakline();
        write('OFFSET ');
        traverse(args[1]);
    }
};
