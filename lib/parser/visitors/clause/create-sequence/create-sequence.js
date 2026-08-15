import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertCreateSequence = ({name}) => callExpression(identifier('createSequence'), [
    identifier(name.name),
]);
