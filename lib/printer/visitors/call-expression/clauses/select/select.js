import {types} from '@putout/babel';
import {createTypeChecker} from '@putout/printer/type-checker';
import {isJsonTuple, printJsonTuple} from '../json-op.js';

const {isTSAsExpression} = types;

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

export const select = (path, printer) => {
    const {write, traverse} = printer;
    const [cols, from] = parseCols(path);
    
    write('SELECT ');
    
    const n = cols.length;
    
    for (const [i, col] of cols.entries()) {
        if (i && i < n)
            write(', ');
        
        printItem(col, printer);
    }
    
    if (isFrom(from)) {
        write.breakline();
        traverse(from);
    }
};

function parseCols(path) {
    const args = path.get('arguments');
    const from = args.at(-1);
    
    if (isFrom(from))
        return [
            args.slice(0, -1),
            from,
        ];
    
    return [args, null];
}
