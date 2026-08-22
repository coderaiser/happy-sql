export const unionAll = (path, {write, traverse}) => {
    const [left, right] = path.get('arguments');
    
    traverse(left);
    write.breakline();
    write('UNION ALL');
    write.breakline();
    traverse(right);
};
