export const desc = (path, {write, traverse}) => {
    traverse(path.get('arguments')[0]);
    write(' DESC');
};
