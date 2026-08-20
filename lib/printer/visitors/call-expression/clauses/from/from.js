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
    const lastArg = args.at(-1);
    const hasWhere = lastArg?.node?.callee?.name === 'where';
    const tableArgs = hasWhere ? args.slice(0, -1) : args;
    
    write('FROM ');
    printArg(tableArgs[0], {
        write,
        traverse,
    });
    
    for (let i = 1; i < tableArgs.length; i++)
        printArg(tableArgs[i], {
            write,
            traverse,
        });
    
    if (hasWhere) {
        write.newline();
        traverse(lastArg);
    }
};
