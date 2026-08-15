import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {
    logicalExpression,
    identifier,
    callExpression,
    binaryExpression,
} = types;

const opName = (op) => {
    if (Array.isArray(op))
        return op.map((k) => k.name).join(' ');
    
    if (typeof op === 'string')
        return op;
    
    return op?.name ?? '';
};

const SQL_TO_JS_OP = {
    '=':  '===',
    '!=': '!==',
    '>=': '>=',
    '<=': '<=',
    '>':  '>',
    '<':  '<',
};

const convertAnd = (node) => logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
const convertOr = (node) => logicalExpression('||', convertCondition(node.left), convertCondition(node.right));

const convertBinary = (node) => {
    const op = opName(node.operator);
    
    if (op === 'LIKE')
        return callExpression(identifier('like'), [convertOperand(node.left), convertOperand(node.right)]);
    
    if (op === 'IS')
        return callExpression(identifier('isNull'), [convertOperand(node.left)]);
    
    if (op === 'IS NOT')
        return callExpression(identifier('isNotNull'), [convertOperand(node.left)]);
    
    if (op === 'IN') {
        const items = node.right.expr.items.map(convertOperand);
        return callExpression(identifier('inList'), [convertOperand(node.left), ...items]);
    }
    
    const jsOp = SQL_TO_JS_OP[op] ?? '===';
    return binaryExpression(jsOp, convertOperand(node.left), convertOperand(node.right));
};

const convertCondition = (node) => {
    if (node.operator?.name === 'AND')
        return convertAnd(node);
    
    if (node.operator?.name === 'OR')
        return convertOr(node);
    
    return convertBinary(node);
};

export const convertWhere = (node) => callExpression(identifier('where'), [
    convertCondition(node.expr),
]);
