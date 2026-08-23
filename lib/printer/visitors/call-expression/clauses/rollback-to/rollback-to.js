export const rollbackTo = (path, {write, traverse}) => {
    write('ROLLBACK TO SAVEPOINT ');
    traverse(path.get('arguments')[0]);
};
