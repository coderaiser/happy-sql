import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

export const convertGroupBy = (clause) => callExpression(identifier('groupBy'), clause.columns.items.map(convertOperand));
