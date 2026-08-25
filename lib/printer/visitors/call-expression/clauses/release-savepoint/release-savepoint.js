export const releaseSavepoint = (path, {write, traverse}) => {
    write('RELEASE SAVEPOINT ');
    traverse(path.get('arguments')[0]);
};