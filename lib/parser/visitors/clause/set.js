import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {
    callExpression,
    identifier,
    binaryExpression,
} = types;

export const convertSet = (setClause) => {
    const args = [];
    
    for (const a of setClause.assignments.items) {
        args.push(binaryExpression('===', identifier(a.column.name), convertOperand(a.expr)));
    }
    
    return callExpression(identifier('set'), args);
};
