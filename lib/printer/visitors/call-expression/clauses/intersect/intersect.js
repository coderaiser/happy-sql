export const intersect = (path, {write, traverse}) => {
    const [left, right] = path.get('arguments');
    
    traverse(left);
    write.breakline();
    write('INTERSECT');
    write.breakline();
    traverse(right);
};
