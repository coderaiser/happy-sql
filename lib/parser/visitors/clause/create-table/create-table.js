import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

export const convertCreateTable = ({name, columns, ifNotExistsKw}) => {
    const colNodes = columns.expr.items.map(convertColumnDefinition);
    const tableArgs = [
        identifier(name.name),
        arrayExpression(colNodes),
    ];
    
    if (ifNotExistsKw)
        return callExpression(identifier('createTableIfNotExists'), tableArgs);
    
    return callExpression(identifier('createTable'), tableArgs);
};
