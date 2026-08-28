export const addConstraint = (path, {write, traverse}) => {
    write('ADD ');
    traverse(path.get('arguments')[0]);
};
