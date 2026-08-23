export const union = (path, {write, traverse}) => {
    const [left, right] = path.get('arguments');
    
    traverse(left);
    write.breakline();
    write('UNION');
    write.breakline();
    traverse(right);
};
