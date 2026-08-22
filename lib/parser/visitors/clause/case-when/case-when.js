import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertCondition} from '#parser/clause/where';

const {callExpression, identifier} = types;

export const convertCaseWhen = (node) => {
    const args = [];
    
    for (const clause of node.clauses) {
        if (clause.type === 'case_when') {
            args.push(convertCondition(clause.condition));
            args.push(convertOperand(clause.result));
            continue;
        }
        
        if (clause.type === 'case_else')
            args.push(callExpression(identifier('else_'), [
                convertOperand(clause.result),
            ]));
    }
    
    return callExpression(identifier('caseWhen'), args);
};
