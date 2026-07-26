import {types} from '@putout/babel';
import {convertWhere} from '#parser/clause/where';
import {convertOperand} from '#parser/operand';

const {
    identifier,
    binaryExpression,
    callExpression,
} = types;

export const convertUpdate = ({clauses}) => {
    const updateClause = clauses.find((c) => c.type === 'update_clause');
    const setClause = clauses.find((c) => c.type === 'set_clause');
    const whereClause = clauses.find((c) => c.type === 'where_clause');
    
    const table = identifier(updateClause.tables.items[0].name);
    const setArgs = [];
    
    for (const a of setClause.assignments.items) {
        setArgs.push(binaryExpression('===', identifier(a.column.name), convertOperand(a.expr)));
    }
    
    const setCall = callExpression(identifier('set'), setArgs);
    
    const args = [
        table,
        setCall,
        whereClause && convertWhere(whereClause),
    ].filter(Boolean);
    
    return callExpression(identifier('update'), args);
};
