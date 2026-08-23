export const alterColumnType = (path, {write, traverse}) => {
    const [col, type] = path.get('arguments');
    
    write('ALTER COLUMN ');
    traverse(col);
    write(' TYPE ');
    traverse(type);
};
