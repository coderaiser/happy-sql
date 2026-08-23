import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
} = types;

const convertReturningItem = (item) => {
    if (item.type === 'all_columns')
        return stringLiteral('*');
    
    if (item.type === 'alias') {
        const {name} = item.expr;
        const aliasName = item.alias.name;
        
        return tsAsExpression(identifier(name), tsLiteralType(stringLiteral(aliasName)));
    }
    
    return identifier(item.name);
};

export const convertReturning = (returningClause) => {
    const args = [];
    
    for (const item of returningClause.columns.items)
        args.push(convertReturningItem(item));
    
    return callExpression(identifier('returning'), args);
};
