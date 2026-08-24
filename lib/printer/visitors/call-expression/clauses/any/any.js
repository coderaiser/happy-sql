export const ANY = (path, {write, traverse}) => {
    write('ANY(');
    
    const args = path.get('arguments');
    
    for (const arg of args)
        traverse(arg);
    
    write(')');
};
