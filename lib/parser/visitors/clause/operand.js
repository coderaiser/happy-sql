import {types} from '@putout/babel';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    memberExpression,
} = types;

export const convertOperand = (node) => {
    if (node.type === 'member_expr')
        return memberExpression(identifier(node.object.name), identifier(node.property.name));
    
    if (node.type === 'parameter')
        return stringLiteral(node.text);
    
    if (node.type === 'number_literal')
        return numericLiteral(node.value);
    
    if (node.type === 'string_literal')
        return stringLiteral(node.value);
    
    return identifier(node.name);
};
