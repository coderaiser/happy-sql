import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {identifier, callExpression} = types;

export const convertSetParam = (stmt) => {
    const args = [identifier(stmt.name.name)];

    for (const item of stmt.value.items)
        args.push(convertOperand(item));

    return callExpression(identifier('setParam'), args);
};

export const convertShowParam = (stmt) =>
    callExpression(identifier('showParam'), [identifier(stmt.name.name)]);