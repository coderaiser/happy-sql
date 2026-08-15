export const on = (path, {write, traverse}) => {
    write('ON ');
    traverse(path.get('arguments.0'));
};
