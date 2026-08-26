import {types} from '@putout/babel';
import {createTypeChecker} from '@putout/printer/type-checker';
import {isJsonTuple, printJsonTuple} from '../json-op.js';

const {
    isTSAsExpression,
    isCallExpression,
} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const printItem = (path, printer) => {
    const {traverse} = printer;
    
    if (isJsonTuple(path.node))
        return printJsonTuple(path, printer);
    
    if (isTSAsExpression(path.node))
        return printAsExpression(path, printer);
    
    traverse(path);
};

const isFrom = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', '=', 'from'],
]);

const isClauseName = (path) => isCallExpression(path.node) && [
    'limitAll',
    'offset',
    'fetchFirst',
    'forUpdate',
].includes(path.node.callee.name);

const isDistinctOn = (path) => isCallExpression(path.node) && path.node.callee.name === 'distinctOn';

export const select = (path, printer) => {
    const {write, traverse} = printer;
    const [cols, trailing] = parseCols(path);
    
    write('SELECT ');
    
    let first = 0;
    
    if (cols.length && isDistinctOn(cols[0])) {
        traverse(cols[0]);
        write(' ');
        first = 1;
    }
    
    const n = cols.length;
    
    for (let i = first; i < n; i++) {
        if (i > first)
            write(', ');
        
        printItem(cols[i], printer);
    }
    
    for (const clause of trailing) {
        write.breakline();
        traverse(clause);
    }
};

function parseCols(path) {
    const args = path.get('arguments');
    const from = args.at(-1);
    
    if (isFrom(from))
        return [
            args.slice(0, -1),
            [from],
        ];
    
    let i = args.length;
    
    while (i && isClauseName(args[i - 1]))
        --i;
    
    return [
        args.slice(0, i),
        args.slice(i),
    ];
}
