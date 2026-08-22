import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {callExpression, identifier} = types;

export const convertUnionAll = (stmt) => {
    return callExpression(identifier('unionAll'), [
        convertClause(stmt.left),
        convertClause(stmt.right),
    ]);
};
