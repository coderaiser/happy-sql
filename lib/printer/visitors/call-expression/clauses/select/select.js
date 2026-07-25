export const select = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const fromIdx = args.findIndex((a) => a.node.callee?.name === 'from');
    const cols = args.slice(0, fromIdx);
    const rest = args.slice(fromIdx);
    
    write('SELECT ');
    for (let i = 0; i < cols.length; i++) {
        if (i > 0)
            write(', ');
        
        traverse(cols[i]);
    }
    
    for (const arg of rest) {
        write('\n');
        traverse(arg);
    }
};
