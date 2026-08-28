import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {callExpression, identifier} = types;

const isDesc = ({type}) => type === 'sort_direction_desc';

const convertNullsOrder = (col, nullHandlingKw) => {
    const isLast = nullHandlingKw.at(-1).name === 'LAST';
    const fnName = isLast ? 'nullsLast' : 'nullsFirst';
    
    return callExpression(identifier(fnName), [col]);
};

const convertOrderItem = (item) => {
    if (item.type !== 'sort_specification')
        return convertOperand(item);
    
    let col = convertOperand(item.expr);
    const {direction} = item;
    
    if (direction && isDesc(direction))
        col = callExpression(identifier('desc'), [col]);
    
    if (item.nullHandlingKw)
        return convertNullsOrder(col, item.nullHandlingKw);
    
    // ASC is default — no wrapper
    return col;
};

export const convertOrderBy = (clause) => callExpression(identifier('orderBy'), clause.specifications.items.map(convertOrderItem));
