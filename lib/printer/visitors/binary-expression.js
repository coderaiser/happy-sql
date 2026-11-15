import {types} from '@putout/babel';

const {isBinaryExpression} = types;

const JS_TO_SQL_OP = {
    '===': '=',
    '!==': '!=',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
};

const ADDITIVE = ['+', '-'];
const MULTIPLICATIVE = ['*', '/', '%'];

const needsParens = (node, operator) => {
    if (!isBinaryExpression(node))
        return false;
    
    return MULTIPLICATIVE.includes(operator) && ADDITIVE.includes(node.operator);
};

const print = (path, operator, {write, traverse}) => {
    if (!needsParens(path.node, operator))
        return traverse(path);
    
    write('(');
    traverse(path);
    write(')');
};

export const BinaryExpression = (path, printer) => {
    const {write} = printer;
    const {operator} = path.node;
    
    print(path.get('left'), operator, printer);
    write(` ${JS_TO_SQL_OP[operator] || operator} `);
    print(path.get('right'), operator, printer);
};
