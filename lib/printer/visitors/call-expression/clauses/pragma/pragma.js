export const pragma = (path, {write, traverse}) => {
    const [name, arg] = path.get('arguments');
    
    write('PRAGMA ');
    traverse(name);
    write('(');
    traverse(arg);
    write(')');
};
