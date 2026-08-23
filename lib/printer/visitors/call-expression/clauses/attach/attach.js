export const attach = (path, {write, traverse}) => {
    const [file, schema] = path.get('arguments');
    
    write('ATTACH DATABASE ');
    traverse(file);
    write(' AS ');
    traverse(schema);
};
