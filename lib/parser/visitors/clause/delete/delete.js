import {types} from '@putout/babel';
import {convertWhere} from '#parser/clause/where';
import {findClause} from '#parser/clause/find';

const {identifier, callExpression} = types;

export const convertDelete = ({clauses}) => {
    const deleteClause = findClause(clauses, 'delete_clause');
    const whereClause = findClause(clauses, 'where_clause');
    
    const table = identifier(deleteClause.tables.items[0].name);
    
    const args = [
        callExpression(identifier('from'), [table]),
        whereClause && convertWhere(whereClause),
    ].filter(Boolean);
    
    return callExpression(identifier('deleteFrom'), args);
};
