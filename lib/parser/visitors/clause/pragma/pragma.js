import {types} from '@putout/babel';
import {convertMemberExpr} from '#parser/clause/operand';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    callExpression,
    binaryExpression,
} = types;

const isPragmaFuncCall = ({type}) => type === 'pragma_func_call';
const isPragmaAssignment = ({type}) => type === 'pragma_assignment';

const convertName = (node) => {
    if (node.type === 'member_expr')
        return convertMemberExpr(node);
    
    return identifier(node.name);
};

const convertValue = (node) => {
    if (node.type === 'keyword' || node.type === 'identifier')
        return identifier(node.name);
    
    if (node.type === 'number_literal')
        return numericLiteral(node.value);
    
    return stringLiteral(node.value);
};

export const convertPragma = ({pragma}) => {
    if (isPragmaAssignment(pragma))
        return convertAssignment(pragma);
    
    if (isPragmaFuncCall(pragma))
        return convertFuncCall(pragma);
    
    return callExpression(identifier('pragma'), [
        convertName(pragma),
    ]);
};

const convertAssignment = ({name, value}) => callExpression(identifier('pragma'), [
    binaryExpression('===', convertName(name), convertValue(value)),
]);

const convertFuncCall = (pragma) => {
    const arg = pragma.args.expr;
    
    return callExpression(identifier('pragma'), [
        identifier(pragma.name.name),
        convertArg(arg),
    ]);
};

const convertArg = (arg) => {
    if (arg.type === 'string_literal')
        return stringLiteral(arg.value);
    
    return identifier(arg.name.toLowerCase());
};
