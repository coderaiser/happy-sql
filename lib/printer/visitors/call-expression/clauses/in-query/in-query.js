export const inQuery = (path, {write, traverse}) => {
    const [col, stmt] = path.get('arguments');
    
    traverse(col);
    write(' IN (');
    traverse(stmt);
    write(')');
};
