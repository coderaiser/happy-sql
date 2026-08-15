import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {
    logicalExpression,
    identifier,
    callExpression,
} = types;

const convertAnd = (node) => logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
const convertOr = (node) => logicalExpression('||', convertCondition(node.left), convertCondition(node.right));
const convertEq = (node) => {
    const {binaryExpression} = types;
    return binaryExpression('===', convertOperand(node.left), convertOperand(node.right));
};

const convertCondition = (node) => {
    if (node.operator?.name === 'AND')
        return convertAnd(node);
    
    if (node.operator?.name === 'OR')
        return convertOr(node);
    
    return convertEq(node);
};

export const convertWhere = (node) => callExpression(identifier('where'), [
    convertCondition(node.expr),
]);
