export const detach = (path, {write, traverse}) => {
    const [schema] = path.get('arguments');
    
    write('DETACH DATABASE ');
    traverse(schema);
};
