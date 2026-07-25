export const from = (path, {write, traverse}) => {
    const args = path.get('arguments');
    write('FROM ');
    traverse(args[0]);
};
