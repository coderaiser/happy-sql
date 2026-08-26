export const collate = (path, {write, traverse}) => {
    const [left, right] = path.get('arguments');
    
    traverse(left);
    write(' COLLATE ');
    traverse(right);
};
