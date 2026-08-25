export const analyze = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('ANALYZE');
    
    if (args.length) {
        write.space();
        traverse(args[0]);
    }
};
