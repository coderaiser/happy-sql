export const notLike = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' NOT LIKE ');
    traverse(args[1]);
};
