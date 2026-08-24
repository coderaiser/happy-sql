import {types} from '@putout/babel';

const {isTSAsExpression} = types;

export const lateralJoin = (path, {write, traverse}) => {
    write(', ');
    
    const [arg] = path.get('arguments');
    const {node} = arg;
    
    if (isTSAsExpression(node)) {
        traverse(arg.get('expression'));
        write(` AS ${node.typeAnnotation.literal.value}`);
        
        return;
    }
    
    traverse(arg);
};
