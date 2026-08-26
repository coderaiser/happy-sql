export const accessMethod = (path, {write, traverse}) => {
    write('USING ');
    traverse(path.get('arguments.0'));
};
