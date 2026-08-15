export const inList = (path, {write, traverse}) => {
    const [head, ...items] = path.get('arguments');
    
    traverse(head);
    write(' IN (');
    
    for (let i = 0; i < items.length; i++) {
        if (i > 0)
            write(', ');
        
        traverse(items[i]);
    }
    
    write(')');
};
