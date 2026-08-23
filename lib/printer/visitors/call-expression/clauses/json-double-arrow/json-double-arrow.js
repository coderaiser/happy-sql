export const jsonDoubleArrow = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' ->> ');
    traverse(args[1]);
};
