const getCalleeName = (node) => {
    if (!node || !node.callee)
        return null;
    
    return node.callee.name;
};

export const references = (path, {write, traverse}) => {
    const [first, ...other] = path.get('arguments');
    
    write('REFERENCES ');
    traverse(first);
    write('(');
    
    let wroteCol = false;
    
    for (const arg of other) {
        const name = getCalleeName(arg.node);
        
        if (name === 'onDelete' || name === 'onUpdate') {
            write(' ');
            traverse(arg);
            continue;
        }
        
        if (wroteCol)
            write(', ');
        
        traverse(arg);
        wroteCol = true;
    }
    
    write(')');
};
