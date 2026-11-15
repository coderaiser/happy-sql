import {createTypeChecker} from '@putout/printer/type-checker';

const isValueContext = createTypeChecker([
    '+: parent -> BinaryExpression',
    [
        '+: parent.callee.name',
        '=',
        'inList',
    ],
]);

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
