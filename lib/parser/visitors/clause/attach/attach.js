import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const convertAttach = (stmt) => callExpression(identifier('attach'), [
    stringLiteral(stmt.file.value),
    identifier(stmt.schema.name),
]);
