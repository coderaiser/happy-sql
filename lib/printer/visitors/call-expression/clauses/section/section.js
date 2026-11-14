import {types} from '@putout/babel';

const {isArrayExpression} = types;

export const section = (path, {write, traverse}) => {
    const [name, stmt] = path.get('arguments');
    write(`-- ${name.node.value}\n`);
    
    if (isArrayExpression(stmt.node)) {
        const elements = stmt.get('elements');
        const lastIndex = elements.length - 1;
        
        for (const [i, element] of elements.entries()) {
            traverse(element);
            write(i < lastIndex ? ';\n\n' : ';');
        }
        
        return;
    }
    
    traverse(stmt);
    write(';');
};
