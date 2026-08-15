export const as = (path, {write, traverse}) => {
    const [column, alias] = path.get('arguments');
    
    traverse(column);
    
    if (alias.node.type === 'StringLiteral') {
        write(' AS ');
        write(alias.node.value);
        
        return;
    }
    
    write(' ');
    traverse(alias);
};
