export const generatedAlwaysAs = (path, {write, traverse}) => {
    write('GENERATED ALWAYS AS (');
    traverse(path.get('arguments.0'));
    write(')');
    
    const [stored] = path.get('arguments').slice(1);
    
    if (stored.node.value)
        write(' STORED');
};
