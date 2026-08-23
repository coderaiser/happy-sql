import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {callExpression, identifier} = types;

const getOpNames = (operator) => {
    if (Array.isArray(operator)) {
        const names = [];
        
        for (const kw of operator)
            names.push(kw.name);
        
        return names;
    }
    
    return [operator.name];
};

export const convertUnion = (stmt) => {
    const ops = getOpNames(stmt.operator);
    const isAll = ops.includes('ALL');
    const name = isAll ? 'unionAll' : 'union';
    
    return callExpression(identifier(name), [
        convertClause(stmt.left),
        convertClause(stmt.right),
    ]);
};
