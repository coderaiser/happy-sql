export const deleteFrom = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [fromArg, ...rest] = args;
    
    write('DELETE ');
    traverse(fromArg);
    
    for (const arg of rest) {
        write.newline();
        traverse(arg);
    }
};
