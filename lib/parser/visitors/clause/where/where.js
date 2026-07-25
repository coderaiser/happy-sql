import {types} from '@putout/babel';

const {binaryExpression, logicalExpression, identifier, stringLiteral, numericLiteral, callExpression} = types;

const convertOperand = (node) => {
    if (node.type === 'parameter') return stringLiteral(node.text);
    if (node.type === 'number_literal') return numericLiteral(node.value);
    if (node.type === 'string_literal') return stringLiteral(node.value);
    return identifier(node.name);
};

const convertAnd = (node) => logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
const convertOr  = (node) => logicalExpression('||', convertCondition(node.left), convertCondition(node.right));
const convertEq  = (node) => binaryExpression('===', convertOperand(node.left), convertOperand(node.right));

const convertCondition = (node) => {
    if (node.operator?.name === 'AND') return convertAnd(node);
    if (node.operator?.name === 'OR')  return convertOr(node);
    return convertEq(node);
};

export const convertWhere = (node) =>
    callExpression(identifier('where'), [convertCondition(node.expr)]);
