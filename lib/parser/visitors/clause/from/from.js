import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertFrom = (node) => callExpression(identifier('from'), [
    identifier(node.expr.name),
]);
