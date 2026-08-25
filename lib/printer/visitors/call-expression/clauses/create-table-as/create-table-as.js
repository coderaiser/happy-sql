export const createTableAs = (path, {write, traverse}) => {
    const [name, stmt] = path.get('arguments');
    
    write('CREATE TABLE ');
    traverse(name);
    write(' AS ');
    traverse(stmt);
};
