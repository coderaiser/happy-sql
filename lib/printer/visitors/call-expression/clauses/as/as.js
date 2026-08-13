export const as = (path, {write, traverse}) => {
    const [column, alias] = path.get('arguments');
    traverse(column);
    write(' AS ');
    write(alias.node.value);
};
