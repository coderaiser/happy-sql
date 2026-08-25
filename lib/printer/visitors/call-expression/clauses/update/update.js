import {types} from '@putout/babel';

const {isCallExpression} = types;

const OR_ACTION_NAMES = [
    'orReplace',
    'orIgnore',
];

const isOrAction = (arg) => isCallExpression(arg.node) && OR_ACTION_NAMES.includes(arg.node.callee.name);

export const update = (path, {write, traverse}) => {
    const args = path.get('arguments');
    let rest = args;
    
    write('UPDATE ');
    
    if (args.length > 0 && isOrAction(args[0])) {
        traverse(args[0]);
        write(' ');
        rest = args.slice(1);
    }
    
    const [table, set] = rest;
    
    traverse(table);
    write.newline();
    traverse(set);
    
    for (const arg of rest.slice(2)) {
        write.newline();
        traverse(arg);
    }
};
