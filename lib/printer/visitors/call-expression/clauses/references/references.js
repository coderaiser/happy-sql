const getCalleeName = (node) => {
    if (!node || !node.callee)
        return null;
    
    return node.callee.name;
};

export const references = (path, {write, traverse}) => {
    const [first, ...other] = path.get('arguments');
    const cols = [];
    const actions = [];
    
    for (const arg of other) {
        const name = getCalleeName(arg.node);
        
        if (name === 'onDelete' || name === 'onUpdate')
            actions.push(arg);
        else
            cols.push(arg);
    }
    
    write('REFERENCES ');
    traverse(first);
    write('(');
    
    for (const [i, col] of cols.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(col);
    }
    
    write(')');
    
    for (const action of actions) {
        write(' ');
        traverse(action);
    }
};
