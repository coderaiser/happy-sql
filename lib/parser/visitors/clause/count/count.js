import {types} from '@putout/babel';

const {
    stringLiteral,
    callExpression,
    identifier,
    numericLiteral,
} = types;

const isAllColumns = ({type}) => type === 'all_columns';
const isNumericLiteral = ({type}) => type === 'number_literal';

export const isCount = (column) => {
    return column.type === 'func_call' && /count/i.test(column.name.name);
};

export const convertCount = (column) => {
    const funcArgs = column.args.expr;
    const {items} = funcArgs.args;
    const args = [];
    
    for (const item of items) {
        if (isAllColumns(item)) {
            args.push(stringLiteral('*'));
            continue;
        }
        
        if (isNumericLiteral(item)) {
            const {value} = item;
            args.push(numericLiteral(value));
            continue;
        }
        
        // column reference: COUNT(id)
        args.push(identifier(item.name));
    }
    
    const name = funcArgs.distinctKw ? 'countDistinct' : 'count';
    
    return callExpression(identifier(name), args);
};
