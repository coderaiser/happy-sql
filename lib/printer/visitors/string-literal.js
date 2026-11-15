import {types} from '@putout/babel';

const {isBinaryExpression} = types;

const isValueContext = ({parent}) => isBinaryExpression(parent) || parent.callee?.name === 'inList';

export const StringLiteral = (path, {write}) => {
    const {value} = path.node;
    
    if (value === '*' && !isValueContext(path))
        return write(value);
    
    if (value.startsWith(':'))
        return write(value);
    
    // quoted identifier like "weird col" — written as is
    if (value.startsWith('"') && value.endsWith('"'))
        return write(value);
    
    write(`'${value.replace(/'/g, `''`)}'`);
};
