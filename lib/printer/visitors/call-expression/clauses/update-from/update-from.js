export const updateFrom = (path, {write, traverse}) => {
    write('FROM ');
    traverse(path.get('arguments')[0]);
};
