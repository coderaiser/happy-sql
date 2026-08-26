export const offset = (path, {write, traverse}) => {
    write('OFFSET ');
    traverse(path.get('arguments')[0]);
};
