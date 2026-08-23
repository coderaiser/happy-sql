import {types} from '@putout/babel';

const {isTSAsExpression} = types;

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    write(` AS ${path.node.typeAnnotation.literal.value}`);
};

export const printTable = (path, printer) => {
    const {traverse} = printer;
    
    if (isTSAsExpression(path.node))
        return printAsExpression(path, printer);
    
    traverse(path);
};

export const printJoinBody = (path, printer) => {
    const {write, traverse} = printer;
    const [table, onClause] = path.get('arguments');
    
    printTable(table, printer);
    write.space();
    traverse(onClause);
};

export const join = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('JOIN ');
    printJoinBody(path, printer);
};
