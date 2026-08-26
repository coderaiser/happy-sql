import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertClause} from '#parser/clause';

const {
    identifier,
    callExpression,
    binaryExpression,
    arrayExpression,
    stringLiteral,
} = types;

const isString = (a) => typeof a === 'string';
const isSubqueryExpr = (node) => node.type === 'select_stmt';

const getName = ({name}) => name;

export const opName = (op) => {
    if (Array.isArray(op)) {
        const parts = [];
        
        for (const k of op)
            parts.push(getName(k));
        
        return parts.join(' ');
    }
    
    if (isString(op))
        return op;
    
    return op.name;
};

const isEscape = (node) => node?.type === 'binary_expr' && opName(node.operator) === 'ESCAPE';

const convertLike = (node) => {
    const args = [
        convertOperand(node.left),
    ];
    
    if (isEscape(node.right))
        args.push(convertOperand(node.right.left), convertOperand(node.right.right));
    else
        args.push(convertOperand(node.right));
    
    return callExpression(identifier('like'), args);
};

const convertNotLike = (node) => callExpression(identifier('notLike'), [
    convertOperand(node.left),
    convertOperand(node.right),
]);

const convertIlike = (node) => callExpression(identifier('ilike'), [
    convertOperand(node.left),
    convertOperand(node.right),
]);

const convertSimilarTo = (node) => callExpression(identifier('similarTo'), [
    convertOperand(node.left),
    convertOperand(node.right),
]);

const convertIsDistinctFrom = (node) => callExpression(identifier('isDistinctFrom'), [
    convertOperand(node.left),
    convertOperand(node.right),
]);

const convertConcatOperand = (node) => {
    if (node.operator && opName(node.operator) === '||')
        return convertConcat(node);
    
    return convertOperand(node);
};

const convertConcat = (node) => callExpression(identifier('concat'), [
    convertConcatOperand(node.left),
    convertConcatOperand(node.right),
]);

const convertJsonTuple = (op) => (node) => arrayExpression([
    convertOperand(node.left),
    stringLiteral(op),
    convertOperand(node.right),
]);

const convertCollate = (node) => callExpression(identifier('collate'), [
    convertOperand(node.left),
    convertOperand(node.right),
]);

const convertIsNull = (node) => callExpression(identifier('isNull'), [
    convertOperand(node.left),
]);

const convertIsNotNull = (node) => callExpression(identifier('isNotNull'), [
    convertOperand(node.left),
]);

const convertIn = (node) => {
    const inner = node.right.expr;
    
    if (isSubqueryExpr(inner))
        return callExpression(identifier('inQuery'), [
            convertOperand(node.left),
            convertClause(inner),
        ]);
    
    const args = [
        convertOperand(node.left),
    ];
    
    for (const item of inner.items)
        args.push(convertOperand(item));
    
    return callExpression(identifier('inList'), args);
};

const convertNotIn = (node) => {
    const args = [
        convertOperand(node.left),
    ];
    
    for (const item of node.right.expr.items)
        args.push(convertOperand(item));
    
    return callExpression(identifier('notInList'), args);
};

const OP_CONVERTERS = {
    'LIKE': convertLike,
    'NOT LIKE': convertNotLike,
    'ILIKE': convertIlike,
    'SIMILAR TO': convertSimilarTo,
    'IS DISTINCT FROM': convertIsDistinctFrom,
    '->': convertJsonTuple('->'),
    '->>': convertJsonTuple('->>'),
    '#>': convertJsonTuple('#>'),
    '#>>': convertJsonTuple('#>>'),
    '?': convertJsonTuple('?'),
    '?|': convertJsonTuple('?|'),
    '?&': convertJsonTuple('?&'),
    '??': convertJsonTuple('??'),
        '@>': convertJsonTuple('@>'),
    '<@': convertJsonTuple('<@'),
    '||': convertConcat,
    'IS': convertIsNull,
    'IS NOT': convertIsNotNull,
    'IN': convertIn,
    'NOT IN': convertNotIn,
    'COLLATE': convertCollate,
};

export const SQL_TO_JS_OP = {
    '=': '===',
    '!=': '!==',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '%': '%',
};

export const convertBinary = (node) => {
    const op = opName(node.operator);
    const convert = OP_CONVERTERS[op];
    
    if (convert)
        return convert(node);
    
    const jsOp = SQL_TO_JS_OP[op] ?? '===';
    
    return binaryExpression(
        jsOp,
        convertOperand(node.left),
        convertOperand(node.right),
    );
};
