export const showParam = (path, {write, traverse}) => {
    write('SHOW ');
    traverse(path.get('arguments')[0]);
};
