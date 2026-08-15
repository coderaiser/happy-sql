export const join = (path, {write, traverse}) => {
    const [table, onClause] = path.get('arguments');

    write('\nJOIN ');
    traverse(table);
    write(' ');
    traverse(onClause);
};
