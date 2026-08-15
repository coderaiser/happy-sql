export const inList = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [head, ...items] = args;
    
    traverse(head);
    write(' IN (');
    
    for (let i = 0; i < items.length; i++) {
        if (i > 0)
            write(', ');
        
        traverse(items[i]);
    }
    
    write(')');
};