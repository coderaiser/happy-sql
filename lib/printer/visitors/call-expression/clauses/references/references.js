export const references = (path, {write, traverse}) => {
    const [first, ...other] = path.get('arguments');
    
    write('REFERENCES ');
    traverse(first);
    write('(');
    
    let wroteCol = false;
    
    for (const arg of other) {
        const name = arg.node?.callee?.name;
        
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
