import {types} from '@putout/babel';

const {
    isTSAsExpression,
    isStringLiteral,
} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const printItem = (path, ctx) => {
    if (isTSAsExpression(path.node))
        return printAsExpression(path, ctx);
    
    ctx.traverse(path);
};

export const select = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const fromIdx = args.findIndex((a) => a.node.callee?.name === 'from');
    const cols = args.slice(0, fromIdx);
    const rest = args.slice(fromIdx);
    
    write('SELECT ');
    for (let i = 0; i < cols.length; i++) {
        if (i > 0)
            write(', ');
        
        printItem(cols[i], {write, traverse});
    }
    
    if (rest.length === 1 && isStringLiteral(rest[0])) {
        traverse(rest[0]);
        write(';');
        
        return;
    }
    
    for (const arg of rest) {
        write('\n');
        traverse(arg);
    }
};
