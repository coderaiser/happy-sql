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

export const convertBetween = (node) => callExpression(identifier('between'), [
    convertOperand(node.left),
    convertOperand(node.begin),
    convertOperand(node.end),
]);

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
