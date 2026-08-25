import {types} from '@putout/babel';

const {
    isTSAsExpression,
    isCallExpression,
} = types;

const isSubqueryAlias = (node) => isCallExpression(node) && [
    'subquery',
    'lateralSubquery',
].includes(node.callee.name);

const printAsExpression = (path, {write, traverse}) => {
    const {expression} = path.node;
    
    traverse(path.get('expression'));
    
    if (isSubqueryAlias(expression))
        write(' ');
    else
        write(' AS ');
    
    write(path.node.typeAnnotation.literal.value);
};

export const lateralJoin = (path, {write, traverse}) => {
    write(', ');
    
    const [arg] = path.get('arguments');
    const {node} = arg;
    
    if (isTSAsExpression(node)) {
        printAsExpression(arg, {
            write,
            traverse,
        });
        
        return;
    }
    
    traverse(arg);
};
