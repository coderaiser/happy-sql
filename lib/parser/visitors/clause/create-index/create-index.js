import {types} from '@putout/babel';
import {convertCondition} from '#parser/clause/where';
import {findClause} from '#parser/clause/find';

const {identifier, callExpression} = types;

const convertColumns = (columns) => {
    const {items} = columns.expr;
    const cols = [];
    
    for (const item of items)
        cols.push(identifier(item.expr.name));
    
    return cols;
};

export const convertCreateIndex = (stmt) => {
    const {
        name,
        table,
        columns,
    } = stmt;
    
    const isUnique = stmt.indexTypeKw && stmt.indexTypeKw.name === 'UNIQUE';
    const args = [
        identifier(name.name),
        identifier(table.name),
        ...convertColumns(columns),
    ];
    const whereClause = findClause(stmt.clauses, 'where_clause');
    
    if (stmt.ifNotExistsKw)
        args.push(callExpression(identifier('ifNotExists'), []));
    
    if (stmt.concurrentlyKw)
        args.push(callExpression(identifier('concurrently'), []));
    
    if (whereClause)
        args.push(callExpression(identifier('where'), [
            convertCondition(whereClause.expr),
        ]));
    
    return callExpression(
        identifier(isUnique ? 'createUniqueIndex' : 'createIndex'),
        args,
    );
};
