import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    memberExpression,
    binaryExpression,
    logicalExpression,
    stringLiteral,
    numericLiteral,
    booleanLiteral,
    nullLiteral,
} = types;

const convertOperand = (node) => {
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

const convertCondition = (node) => {
    if (node.operator?.name === 'AND')
        return logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
    
    if (node.operator?.name === 'OR')
        return logicalExpression('||', convertCondition(node.left), convertCondition(node.right));
    
    return binaryExpression('===', convertOperand(node.left), convertOperand(node.right));
};

const convertOn = (spec) => callExpression(identifier('on'), [
    convertCondition(spec.expr),
]);

const convertAlias = (node) => {
    if (node.type === 'alias')
        return callExpression(identifier('as'), [
            identifier(node.expr.name),
            identifier(node.alias.name),
        ]);
    
    return identifier(node.name);
};

const flattenJoins = (node, joins = []) => {
    if (node.type === 'join_expr') {
        flattenJoins(node.left, joins);
        joins.push(callExpression(identifier('join'), [
            convertAlias(node.right),
            convertOn(node.specification),
        ]));
        
        return joins;
    }
    
    joins.unshift(convertAlias(node));
    
    return joins;
};

export const convertFrom = ({expr}) => {
    if (expr.type === 'join_expr') {
        const parts = flattenJoins(expr);
        return callExpression(identifier('from'), parts);
    }
    
    if (expr.type === 'alias')
        return callExpression(identifier('from'), [
            convertAlias(expr),
        ]);
    
    return callExpression(identifier('from'), [
        identifier(expr.name),
    ]);
};
