import {types} from '@putout/babel';

const {callExpression, identifier, numericLiteral} = types;

export const convertLimit = (limitClause) => {
    const args = [numericLiteral(limitClause.count.value)];
    
    if (limitClause.offset)
        args.push(numericLiteral(limitClause.offset.value));
    
    return callExpression(identifier('limit'), args);
};
