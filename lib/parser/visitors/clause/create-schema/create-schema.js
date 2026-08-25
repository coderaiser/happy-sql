import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertCreateSchema = (stmt) =>
    callExpression(identifier('createSchema'), [identifier(stmt.name.name)]);