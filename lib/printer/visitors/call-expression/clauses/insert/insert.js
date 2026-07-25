export const insert = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    if (args[1]) {
        write(' ');
        traverse(args[1]);
    }
};
