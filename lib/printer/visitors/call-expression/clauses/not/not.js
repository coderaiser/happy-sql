export const not = (path, {write, traverse}) => {
    write('NOT ');
    traverse(path.get('arguments')[0]);
};
