import {types} from '@putout/babel';

const {isTSAsExpression, isStringLiteral} = types;

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
    const fromArg = args.at(-1);
    const cols = args.slice(0, -1);
    
    write('SELECT ');
    
    for (let i = 0; i < cols.length; i++) {
        if (i > 0)
            write(', ');
        
        printItem(cols[i], {write, traverse});
    }
    
    write('\n');
    traverse(fromArg);
};
