export const del = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const fromArg = args[0];
    const whereArg = args[1];

    write('DELETE ');
    traverse(fromArg);
    if (whereArg) {
        write('\n');
        traverse(whereArg);
    }
};
