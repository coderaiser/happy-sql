import {types} from '@putout/babel';
import {createTypeChecker} from '@putout/printer/type-checker';

const {isTSAsExpression} = types;

const isSubqueryAlias = createTypeChecker([
    ['+: node.callee.name', '=', 'subquery'],
    ['+: node.callee.name', '=', 'lateralSubquery'],
]);

const printAsExpression = (path, {write, traverse}) => {
    traverse(path.get('expression'));
    
    if (isSubqueryAlias(path.get('expression')))
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
