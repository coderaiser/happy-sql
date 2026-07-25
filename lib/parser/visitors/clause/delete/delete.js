import {types} from '@putout/babel';
import {convertWhere} from '#parser/clause/where';

const {identifier, callExpression} = types;

export const convertDelete = ({clauses}) => {
    const deleteClause = clauses.find((c) => c.type === 'delete_clause');
    const whereClause = clauses.find((c) => c.type === 'where_clause');

    const table = identifier(deleteClause.tables.items[0].name);

    const args = [
        callExpression(identifier('from'), [table]),
        whereClause && convertWhere(whereClause),
    ].filter(Boolean);

    return callExpression(identifier('delete'), args);
};
