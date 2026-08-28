import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

export const convertGroupBy = (clause) => {
    const args = [];
    
    for (const item of clause.columns.items)
        args.push(convertOperand(item));
    
    return callExpression(identifier('groupBy'), args);
};
