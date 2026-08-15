export const like = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    write(' LIKE ');
    traverse(args[1]);
};