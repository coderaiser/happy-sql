import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

const convertOrderItem = (item) => {
    if (item.type !== 'sort_specification')
        return convertOperand(item);
    
    const col = convertOperand(item.expr);
    const {direction} = item;
    
    if (direction.type === 'sort_direction_desc')
        return callExpression(identifier('desc'), [col]);
    
    // ASC is default — no wrapper
    return col;
};

export const convertOrderBy = (clause) => callExpression(identifier('orderBy'), clause.specifications.items.map(convertOrderItem));
