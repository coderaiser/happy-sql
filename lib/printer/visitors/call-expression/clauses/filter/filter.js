export const filter = (path, {write, traverse}) => {
    const [fn, condition] = path.get('arguments');
    
    traverse(fn);
    write(' FILTER (WHERE ');
    traverse(condition);
    write(')');
};
