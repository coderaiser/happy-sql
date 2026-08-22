import {types} from '@putout/babel';

const {isTSAsExpression} = types;

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

export const returning = (path, {write, traverse}) => {
    write('RETURNING ');
    const args = path.get('arguments');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        printItem(arg, {
            write,
            traverse,
        });
    }
};
