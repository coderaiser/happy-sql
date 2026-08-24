export const except = (path, {write, traverse}) => {
    const [left, right] = path.get('arguments');
    
    traverse(left);
    write.breakline();
    write('EXCEPT');
    write.breakline();
    traverse(right);
};
