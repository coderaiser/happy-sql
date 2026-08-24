export const replaceInto = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('REPLACE ');
    traverse(args[0]);
    
    for (const arg of args.slice(1)) {
        write.breakline();
        traverse(arg);
    }
};
