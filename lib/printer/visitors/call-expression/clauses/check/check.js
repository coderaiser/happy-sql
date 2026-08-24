export const check = (path, {write, traverse}) => {
    write('CHECK (');
    
    const [arg] = path.get('arguments');
    traverse(arg);
    
    write(')');
};
