export const default_ = (path, {write, traverse}) => {
    write('DEFAULT ');
    
    const [arg] = path.get('arguments');
    traverse(arg);
};
