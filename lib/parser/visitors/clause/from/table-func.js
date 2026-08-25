import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

const SNAKE_RE = /_([a-z])/g;
const toCamel = (s) => s.replace(SNAKE_RE, (_, c) => c.toUpperCase());

export const convertTableFunc = (expr) => {
    // multi-word snake_case names are lowercased first (GENERATE_SERIES → generateSeries)
    const name = toCamel(expr.name.name.includes('_') ? expr.name.name.toLowerCase() : expr.name.name);
    const args = expr.args.expr.args.items.map(convertOperand);
    
    return callExpression(identifier(name), args);
};
