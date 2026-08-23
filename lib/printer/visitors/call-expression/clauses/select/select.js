import {types} from '@putout/babel';

const isUndefined = (a) => typeof a === 'undefined';
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
    
    if (isTSAsExpression(path.node))
        return printAsExpression(path, printer);
    
    traverse(path);
};

export const select = (path, printer) => {
    const {write, traverse} = printer;
    const args = path.get('arguments');
    const lastArg = args.at(-1);
    const hasFrom = !isUndefined(lastArg) && isCallExpression(lastArg.node) && lastArg.node.callee.name === 'from';
    const fromArg = hasFrom ? lastArg : null;
    const cols = hasFrom ? args.slice(0, -1) : args;
    
    write('SELECT ');
    
    for (let i = 0; i < cols.length; i++) {
        if (i > 0)
            write(', ');
        
        printItem(cols[i], printer);
    }
    
    if (fromArg) {
        write.breakline();
        traverse(fromArg);
    }
};
