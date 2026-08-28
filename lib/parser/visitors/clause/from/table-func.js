import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

const SNAKE_RE = /_([a-z])/g;
const toCamel = (s) => s.replace(SNAKE_RE, (_, c) => c.toUpperCase());

const getRawName = (expr) => {
    const raw = expr.name.name;
    
    if (raw.includes('_'))
        return raw.toLowerCase();
    
    return raw;
};

export const convertTableFunc = (expr) => {
    // multi-word snake_case names are lowercased first (GENERATE_SERIES → generateSeries)
    const name = toCamel(getRawName(expr));
    const args = expr.args.expr.args.items.map(convertOperand);
    
    return callExpression(identifier(name), args);
};
