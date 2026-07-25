export const where = (path, {write, traverse}) => {
    const args = path.get('arguments');
    write('WHERE ');
    traverse(args[0]);
};
