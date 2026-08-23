export const similarTo = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' SIMILAR TO ');
    traverse(args[1]);
};
