const isWhereArg = ({node}) => node.type === 'CallExpression' && node.callee.name === 'where';

export const onConflict = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const action = args.at(-1);
    let whereArg = null;
    let targetCount = args.length - 1;
    
    if (targetCount && isWhereArg(args.at(-2))) {
        whereArg = args.at(-2);
        --targetCount;
    }
    
    const targets = args.slice(0, targetCount);
    
    write('ON CONFLICT');
    
    if (targets.length) {
        write(' (');
        for (let i = 0; i < targets.length; i++) {
            if (i > 0)
                write(', ');
            
            traverse(targets[i]);
        }
        
        write(')');
    }
    
    if (whereArg) {
        write(' ');
        traverse(whereArg);
    }
    
    write(' DO ');
    
    if (action.node.type === 'Identifier' && action.node.name === 'nothing') {
        write('NOTHING');
        return;
    }
    
    write('UPDATE ');
    traverse(action);
};
