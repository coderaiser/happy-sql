export const extract = (path, {write, traverse}) => {
    const [unit, col] = path.get('arguments');
    
    write('EXTRACT(');
    traverse(unit);
    write(' FROM ');
    traverse(col);
    write(')');
};
