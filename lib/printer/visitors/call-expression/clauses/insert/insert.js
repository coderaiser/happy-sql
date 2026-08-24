const isOrAction = (arg) => {
    const {name} = arg.node.callee;
    
    return name === 'orReplace' || name === 'orIgnore';
};

export const insert = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [first] = args;
    const rest = isOrAction(first) ? args.slice(1) : args;
    
    write('INSERT ');
    
    if (isOrAction(first)) {
        traverse(first);
        write.breakline();
    }
    
    traverse(rest[0]);
    
    for (const arg of rest.slice(1)) {
        write.breakline();
        traverse(arg);
    }
};
