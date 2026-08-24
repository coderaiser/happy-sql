export const ALL = (path, {write, traverse}) => {
    write('ALL(');
    
    const args = path.get('arguments');
    
    for (const arg of args)
        traverse(arg);
    
    write(')');
};
