export const arrayType = (path, {write, traverse}) => {
    traverse(path.get('arguments')[0]);
    write('[]');
};
