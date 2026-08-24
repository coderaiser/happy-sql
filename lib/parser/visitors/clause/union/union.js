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

const getName = (ops) => {
    if (ops.includes('INTERSECT'))
        return 'intersect';
    
    if (ops.includes('EXCEPT'))
        return 'except';
    
    if (ops.includes('ALL'))
        return 'unionAll';
    
    return 'union';
};

export const convertUnion = (stmt) => {
    const ops = getOpNames(stmt.operator);
    const name = getName(ops);
    
    return callExpression(identifier(name), [
        convertClause(stmt.left),
        convertClause(stmt.right),
    ]);
};
