import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

export const convertCreateTable = ({name, columns}) => {
    const colNodes = columns.expr.items.map(convertColumnDefinition);
    
    return callExpression(identifier('createTable'), [
        identifier(name.name),
        arrayExpression(colNodes),
    ]);
};
