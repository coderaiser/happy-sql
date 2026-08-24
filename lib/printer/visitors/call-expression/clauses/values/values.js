import {types} from '@putout/babel';

const {isCallExpression} = types;

const isRow = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'row';

const printArgs = (args, {write, traverse}) => {
    for (let i = 0; i < args.length; i++) {
        if (i > 0)
            write(', ');
        
        traverse(args[i]);
    }
};

export const values = (path, printer) => {
    const {write} = printer;
    const args = path.get('arguments');
    
    if (args.length > 0 && isRow(args[0])) {
        write('VALUES ');
        printArgs(args, printer);
        
        return;
    }
    
    write('VALUES (');
    printArgs(args, printer);
    write(')');
};
