import {types} from '@putout/babel';

const {isTSAsExpression} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const CLAUSE_NAMES = [
    'where',
    'groupBy',
    'having',
];

const isClause = ({node}) => node.type === 'CallExpression' && CLAUSE_NAMES.includes(node.callee?.name);

const printArg = (path, ctx) => {
    if (isTSAsExpression(path.node))
        return printAsExpression(path, ctx);
    
    ctx.traverse(path);
};

export const from = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const tableArgs = args.filter((arg) => !isClause(arg));
    const clauseArgs = args.filter(isClause);
    
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
    
    for (const clause of clauseArgs) {
        write.breakline();
        traverse(clause);
    }
};
