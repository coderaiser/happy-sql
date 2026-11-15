import {createTypeChecker} from '@putout/printer/type-checker';

const isOrAction = createTypeChecker([
    ['+: node.callee.name', '=', 'orReplace'],
    ['+: node.callee.name', '=', 'orIgnore'],
    ['+: node.callee.name', '=', 'orAbort'],
    ['+: node.callee.name', '=', 'orFail'],
]);

export const update = (path, {write, traverse}) => {
    const args = path.get('arguments');
    let rest = args;
    
    write('UPDATE ');
    
    if (isOrAction(args[0])) {
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
