import {types} from '@putout/babel';

const {isTSAsExpression} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

const printTable = (path, ctx) => {
    if (isTSAsExpression(path.node))
        return printAsExpression(path, ctx);
    
    ctx.traverse(path);
};

export const join = (path, {write, traverse}) => {
    const [table, onClause] = path.get('arguments');
    
    write('\nJOIN ');
    printTable(table, {write, traverse});
    write(' ');
    traverse(onClause);
};
