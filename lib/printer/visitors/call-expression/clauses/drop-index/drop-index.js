import {types} from '@putout/babel';

const {isCallExpression} = types;

const isIfExists = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'ifExists';

export const dropIndex = (path, {write, traverse}) => {
    const args = path.get('arguments');
    let rest = args;
    
    write('DROP INDEX ');
    
    if (args.length > 0 && isIfExists(args[0])) {
        write('IF EXISTS ');
        rest = args.slice(1);
    }
    
    for (const [i, arg] of rest.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
};
