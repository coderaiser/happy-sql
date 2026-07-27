export const count = (path, {write, traverse}) => {
    const [first] = path.get('arguments');
    write('COUNT');
    write('(');
    traverse(first);
    write(')');
};
