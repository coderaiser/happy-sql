export const ilike = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' ILIKE ');
    traverse(args[1]);
};
