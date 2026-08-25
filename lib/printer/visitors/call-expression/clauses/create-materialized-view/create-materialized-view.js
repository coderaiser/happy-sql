export const createMaterializedView = (path, {write, traverse}) => {
    const [name, stmt] = path.get('arguments');
    
    write('CREATE MATERIALIZED VIEW ');
    traverse(name);
    write(' AS ');
    traverse(stmt);
};
