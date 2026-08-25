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
const isNotExists = (node) => node.type === 'prefix_op_expr' && node.operator.name === 'NOT' && isExists(node.expr);
const isParenExpr = (node) => node.type === 'paren_expr';

const POSTFIX_OP = {
    ISNULL: 'isNull',
    NOTNULL: 'isNotNull',
};

const convertPostfix = (node) => {
    const {name} = node.operator;
    const fn = POSTFIX_OP[name];
    
    return callExpression(identifier(fn), [
        convertOperand(node.expr),
    ]);
};

export const convertCondition = (node) => {
    if (node.operator && node.operator.name === 'AND')
        return convertAnd(node);
    
    if (node.operator && node.operator.name === 'OR')
        return convertOr(node);
    
    if (node.type === 'between_expr')
        return convertBetween(node);
    
    if (node.type === 'postfix_op_expr')
        return convertPostfix(node);
    
    if (isNotExists(node))
        return callExpression(identifier('notExists'), [
            convertClause(node.expr.expr.expr),
        ]);
    
    if (isExists(node))
        return callExpression(identifier('exists'), [
            convertClause(node.expr.expr),
        ]);
    
    if (isParenExpr(node))
        return convertCondition(node.expr);
    
    return convertBinary(node);
};

export const convertWhere = (node) => callExpression(identifier('where'), [
    convertCondition(node.expr),
]);
