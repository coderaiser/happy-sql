import {types} from '@putout/babel';

const {isTSAsExpression} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const printArg = (path, ctx) => {
    if (isTSAsExpression(path.node))
        return printAsExpression(path, ctx);
    
    ctx.traverse(path);
};

export const from = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('FROM ');
    printArg(args[0], {
        write,
        traverse,
    });
    
    for (let i = 1; i < args.length; i++)
        printArg(args[i], {
            write,
            traverse,
        });
};
