export const BooleanLiteral = (path, {write}) => {
    const {value} = path.node;
    
    if (value)
        return write('TRUE');
    
    write('FALSE');
};
