export const insert = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [intoArg] = args;
    const rest = args.slice(1);
    
    traverse(intoArg);
    
    for (const arg of rest) {
        write.newline();
        traverse(arg);
    }
};
