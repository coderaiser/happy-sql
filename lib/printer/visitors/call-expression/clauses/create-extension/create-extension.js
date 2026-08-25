export const createExtension = (path, {write, traverse}) => {
    write('CREATE EXTENSION ');
    traverse(path.get('arguments')[0]);
};
