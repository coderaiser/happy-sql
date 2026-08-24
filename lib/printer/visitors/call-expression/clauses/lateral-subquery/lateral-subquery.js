export const lateralSubquery = (path, {write, traverse}) => {
    write('LATERAL (');
    
    const [arg] = path.get('arguments');
    traverse(arg);
    
    write(')');
};
