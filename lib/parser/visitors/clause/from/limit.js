import {types} from '@putout/babel';

const {
    callExpression,
    identifier,
    numericLiteral,
} = types;

export const convertLimit = (limitClause) => {
    if (limitClause.count?.type === 'limit_all')
        return callExpression(identifier('limitAll'), []);
    
    const args = [
        numericLiteral(limitClause.count.value),
    ];
    
    if (limitClause.offset)
        args.push(numericLiteral(limitClause.offset.value));
    
    return callExpression(identifier('limit'), args);
};

export const convertOffset = (offsetClause) => callExpression(identifier('offset'), [
    numericLiteral(offsetClause.offset.value),
]);

export const convertFetch = (fetchClause) => callExpression(identifier('fetchFirst'), [
    numericLiteral(fetchClause.count.value),
]);

export const convertForUpdate = () => callExpression(identifier('forUpdate'), []);
