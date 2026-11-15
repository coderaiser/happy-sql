import {types} from '@putout/babel';

const {isLogicalExpression} = types;

export const not = (path, {write, traverse}) => {
    const [arg] = path.get('arguments');
    
    write('NOT ');
    
    if (!isLogicalExpression(arg.node))
        return traverse(arg);
    
    write('(');
    traverse(arg);
    write(')');
};
