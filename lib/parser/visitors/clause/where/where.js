import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertClause} from '#parser/clause';
import {convertBinary} from '#parser/clause/binary';

const {
    logicalExpression,
    identifier,
    callExpression,
} = types;

const convertAnd = (node) => logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
const convertOr = (node) => logicalExpression('||', convertCondition(node.left), convertCondition(node.right));

const isNotBetween = (node) => Array.isArray(node.betweenKw) && node.betweenKw[0].name === 'NOT';

export const convertBetween = (node) => {
    const args = [
        convertOperand(node.left),
        convertOperand(node.begin),
        convertOperand(node.end),
    ];
    
    if (isNotBetween(node))
        return callExpression(identifier('notBetween'), args);
    
    return callExpression(identifier('between'), args);
};

const isExists = (node) => node.type === 'prefix_op_expr' && node.operator.name === 'EXISTS';

export const convertCondition = (node) => {
    if (node.operator && node.operator.name === 'AND')
        return convertAnd(node);
    
    if (node.operator && node.operator.name === 'OR')
        return convertOr(node);
    
    if (node.type === 'between_expr')
        return convertBetween(node);
    
    if (isExists(node))
        return callExpression(identifier('exists'), [
            convertClause(node.expr.expr),
        ]);
    
    return convertBinary(node);
};

export const convertWhere = (node) => callExpression(identifier('where'), [
    convertCondition(node.expr),
]);
