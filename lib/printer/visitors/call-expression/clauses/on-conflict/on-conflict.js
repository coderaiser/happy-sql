export const onConflict = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const action = args[args.length - 1];
    const targets = args.slice(0, -1);

    write('ON CONFLICT');
    if (targets.length) {
        write(' (');
        for (let i = 0; i < targets.length; i++) {
            if (i > 0) write(', ');
            traverse(targets[i]);
        }
        write(')');
    }
    write(' DO ');
    if (action.node.type === 'Identifier' && action.node.name === 'nothing')
        write('NOTHING');
    else {
        write('UPDATE ');
        traverse(action);
    }
};
