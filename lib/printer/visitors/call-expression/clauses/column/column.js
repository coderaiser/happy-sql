export const column = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write.space();
        
        traverse(arg);
    }
};
