export const collate = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' COLLATE ');
    traverse(args[1]);
};
