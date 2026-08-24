export const pgCast = (path, {write, traverse}) => {
    const [value, type] = path.get('arguments');
    
    traverse(value);
    write('::');
    traverse(type);
};
