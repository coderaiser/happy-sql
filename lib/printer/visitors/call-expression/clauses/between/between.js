export const between = (path, {write, traverse}) => {
    const [col, lo, hi] = path.get('arguments');
    
    traverse(col);
    write(' BETWEEN ');
    traverse(lo);
    write(' AND ');
    traverse(hi);
};
