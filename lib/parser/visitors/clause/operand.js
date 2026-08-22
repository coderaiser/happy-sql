import {types} from '@putout/babel';
import {convertCount, isCount} from '#parser/clause/count';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    booleanLiteral,
    nullLiteral,
    memberExpression,
} = types;

export const convertOperand = (node) => {
    if (isCount(node))
        return convertCount(node);
    
    if (node.type === 'member_expr')
        return memberExpression(identifier(node.object.name), identifier(node.property.name));
    
    if (node.type === 'parameter')
        return stringLiteral(node.text);
    
    if (node.type === 'number_literal')
        return numericLiteral(node.value);
    
    if (node.type === 'string_literal')
        return stringLiteral(node.value);
    
    if (node.type === 'boolean_literal')
        return booleanLiteral(node.value);
    
    if (node.type === 'null_literal')
        return nullLiteral(node.value);
    
    return identifier(node.name);
};
