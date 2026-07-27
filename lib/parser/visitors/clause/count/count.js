import {types} from '@putout/babel';

const {
    stringLiteral,
    callExpression,
    identifier,
} = types;

export const isCount = (column) => {
    return column.type === 'func_call' && /count/i.test(column.name.name);
};

export const convertCount = (column) => {
    const {items} = column.args.expr.args;
    const args = [];
    
    for (const item of items) {
        if (item.type === 'all_columns')
            args.push(stringLiteral('*'));
    }
    
    return callExpression(identifier('count'), args);
};
