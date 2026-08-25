export const createVirtualTable = (path, {write, traverse}) => {
    const [name, module] = path.get('arguments');

    write('CREATE VIRTUAL TABLE ');
    traverse(name);
    write(' USING ');
    traverse(module);
};