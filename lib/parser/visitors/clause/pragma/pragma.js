import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertPragma = (stmt) => {
    const {pragma} = stmt;
    const arg = pragma.args.expr;
    
    return callExpression(identifier('pragma'), [
        identifier(pragma.name.name),
        identifier(arg.name.toLowerCase()),
    ]);
};
