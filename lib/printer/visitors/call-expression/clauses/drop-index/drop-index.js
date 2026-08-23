export const dropIndex = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('DROP INDEX ');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
