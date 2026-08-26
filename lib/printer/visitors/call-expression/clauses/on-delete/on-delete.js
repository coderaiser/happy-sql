const ACTION_PRINT = {
    SET_NULL: 'SET NULL',
    SET_DEFAULT: 'SET DEFAULT',
    NO_ACTION: 'NO ACTION',
};

export const onDelete = (path, {write, traverse}) => {
    write('ON DELETE ');
    printAction(path, {
        write,
        traverse,
    });
};

export const onUpdate = (path, {write, traverse}) => {
    write('ON UPDATE ');
    printAction(path, {
        write,
        traverse,
    });
};

const printAction = (path, printer) => {
    const {write, traverse} = printer;
    const arg = path.get('arguments.0');
    const {name} = arg.node;
    
    if (ACTION_PRINT[name])
        return write(ACTION_PRINT[name]);
    
    traverse(arg);
};
