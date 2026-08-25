import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertCreateExtension = (stmt) =>
    callExpression(identifier('createExtension'), [identifier(stmt.name.name)]);