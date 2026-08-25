export const StringLiteral = (path, {write}) => {
    const {value} = path.node;
    
    if (value === '*' || value.startsWith(':'))
        return write(value);
    
    // quoted identifier like "weird col" — written as is
    if (value.startsWith('"') && value.endsWith('"'))
        return write(value);
    
    write(`'${value}'`);
};
