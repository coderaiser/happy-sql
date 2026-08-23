import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertClause} from '#parser/clause';

const {
    identifier,
    callExpression,
    binaryExpression,
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

const convertLike = (node) => callExpression(identifier('like'), [
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

    const args = [convertOperand(node.left)];

    for (const item of inner.items)
        args.push(convertOperand(item));

    return callExpression(identifier('inList'), args);
};

const convertNotIn = (node) => {
    const args = [convertOperand(node.left)];

    for (const item of node.right.expr.items)
        args.push(convertOperand(item));

    return callExpression(identifier('notInList'), args);
};

const OP_CONVERTERS = {
    LIKE: convertLike,
    IS: convertIsNull,
    'IS NOT': convertIsNotNull,
    IN: convertIn,
    'NOT IN': convertNotIn,
};

export const SQL_TO_JS_OP = {
    '=': '===',
    '!=': '!==',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
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
