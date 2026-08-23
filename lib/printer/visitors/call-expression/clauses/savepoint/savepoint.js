export const savepoint = (path, {write, traverse}) => {
    write('SAVEPOINT ');
    traverse(path.get('arguments')[0]);
};
