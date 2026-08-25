export const createView = (path, {write, traverse}) => {
    const [name, stmt] = path.get('arguments');

    write('CREATE VIEW ');
    traverse(name);
    write(' AS ');
    traverse(stmt);
};