export const notBetween = (path, {write, traverse}) => {
    const [col, lo, hi] = path.get('arguments');
    
    traverse(col);
    write(' NOT BETWEEN ');
    traverse(lo);
    write(' AND ');
    traverse(hi);
};
