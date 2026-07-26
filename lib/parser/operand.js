import {types} from '@putout/babel';

const {
    identifier,
    stringLiteral,
    numericLiteral,
} = types;

export const convertOperand = (node) => {
    if (node.type === 'parameter')
        return stringLiteral(node.text);
    
    if (node.type === 'number_literal')
        return numericLiteral(node.value);
    
    if (node.type === 'string_literal')
        return stringLiteral(node.value);
    
    return identifier(node.name);
};
