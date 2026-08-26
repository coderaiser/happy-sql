export const rowsBetween = (path, {write, traverse}) => {
    const [begin, end] = path.get('arguments');
    
    write('ROWS BETWEEN ');
    traverse(begin);
    write(' AND ');
    traverse(end);
};

export const preceding = (path, {write, traverse}) => {
    const [expr] = path.get('arguments');
    
    if (expr?.node) {
        traverse(expr);
        write(' PRECEDING');
        
        return;
    }
    
    write('UNBOUNDED PRECEDING');
};

export const following = (path, {write, traverse}) => {
    const [expr] = path.get('arguments');
    
    if (expr?.node) {
        traverse(expr);
        write(' FOLLOWING');
        
        return;
    }
    
    write('UNBOUNDED FOLLOWING');
};

export const currentRow = (path, {write}) => {
    write('CURRENT ROW');
};
