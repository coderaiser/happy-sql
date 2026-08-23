import {types} from '@putout/babel';

const {
    isTSAsExpression,
    isCallExpression,
} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const CLAUSE_NAMES = [
    'where',
    'groupBy',
    'having',
    'orderBy',
    'limit',
];

const TABLE_ARG_NAMES = [
    ...CLAUSE_NAMES,
    'join',
    'leftJoin',
    'rightJoin',
    'innerJoin',
        'leftOuterJoin',
    'crossJoin',
    'on',
    'subquery',
];

const isClause = ({node}) => isCallExpression(node) && CLAUSE_NAMES.includes(node.callee.name);

const CAMEL_RE = /([A-Z])/g;
const toSnake = (a) => a.replace(CAMEL_RE, (_, c) => `_${c.toLowerCase()}`);

const isTableFunc = (node) => isCallExpression(node) && !TABLE_ARG_NAMES.includes(node.callee.name);

const printTableFunc = (path, {write, traverse}) => {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    write(toSnake(name));
    write('(');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};

const printArg = (path, printer) => {
    const {node} = path;
    const {traverse} = printer;
    
    if (isTSAsExpression(node))
        return printAsExpression(path, printer);
    
    if (isTableFunc(node))
        return printTableFunc(path, printer);
    
    traverse(path);
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
