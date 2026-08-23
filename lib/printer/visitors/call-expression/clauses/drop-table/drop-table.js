import {types} from '@putout/babel';

const {isCallExpression} = types;

const isIfExists = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'ifExists';

export const dropTable = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('DROP TABLE ');
    
    let tableArgs = args;
    
    if (args.length > 0 && isIfExists(args[0])) {
        write('IF EXISTS ');
        tableArgs = args.slice(1);
    }
    
    for (const [i, arg] of tableArgs.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
