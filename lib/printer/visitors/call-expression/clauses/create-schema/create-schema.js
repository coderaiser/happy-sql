export const createSchema = (path, {write, traverse}) => {
    write('CREATE SCHEMA ');
    traverse(path.get('arguments')[0]);
};
