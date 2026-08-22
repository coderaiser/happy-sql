import {types} from '@putout/babel';

const {
    callExpression,
    identifier,
    numericLiteral,
    stringLiteral,
} = types;

const SNAKE_RE = /_([a-z])/g;
const toCamel = (s) => s.replace(SNAKE_RE, (_, c) => c.toUpperCase());

const convertArg = (arg) => {
    if (arg.type === 'number_literal')
        return numericLiteral(arg.value);
    
    if (arg.type === 'string_literal')
        return stringLiteral(arg.value);
    
    return identifier(arg.name);
};

export const convertTableFunc = (expr) => {
    const name = toCamel(expr.name.name);
    const args = expr.args.expr.args.items.map(convertArg);
    
    return callExpression(identifier(name), args);
};
