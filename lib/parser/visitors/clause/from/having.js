import {types} from '@putout/babel';
import {convertCondition} from '#parser/clause/where';

const {callExpression, identifier} = types;

export const convertHaving = (clause) => callExpression(identifier('having'), [
    convertCondition(clause.expr),
]);
