export const deleteFrom = (path, {write, traverse}) => {
    const [fromArg, ...rest] = path.get('arguments');
    
    write('DELETE ');
    traverse(fromArg);
    
    for (const arg of rest) {
        write.newline();
        traverse(arg);
    }
};
