export const del = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [fromArg] = args;
    const [, whereArg] = args;
    
    write('DELETE ');
    traverse(fromArg);
    
    if (whereArg) {
        write('\n');
        traverse(whereArg);
    }
};
