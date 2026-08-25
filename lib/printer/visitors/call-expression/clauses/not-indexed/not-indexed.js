export const notIndexed = (path, {write, traverse}) => {
    traverse(path.get('arguments')[0]);
    write(' NOT INDEXED');
};