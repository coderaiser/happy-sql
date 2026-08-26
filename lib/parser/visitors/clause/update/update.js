import {types} from '@putout/babel';
import {convertWhere} from '#parser/clause/where';
import {convertOperand} from '#parser/clause/operand';
import {convertReturning} from '#parser/clause/returning';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    binaryExpression,
    callExpression,
} = types;

const OR_ACTION_MAP = {
    REPLACE: () => callExpression(identifier('orReplace'), []),
    IGNORE: () => callExpression(identifier('orIgnore'), []),
    ABORT: () => callExpression(identifier('orAbort'), []),
    FAIL: () => callExpression(identifier('orFail'), []),
};

const convertOrAction = (orAction) => {
    if (!orAction)
        return null;
    
    return OR_ACTION_MAP[orAction.actionKw.name]();
};

export const convertUpdate = ({clauses}) => {
    const updateClause = findClause(clauses, 'update_clause');
    const setClause = findClause(clauses, 'set_clause');
    const fromClause = findClause(clauses, 'from_clause');
    const whereClause = findClause(clauses, 'where_clause');
    const returningClause = findClause(clauses, 'returning_clause');
    
    const table = identifier(updateClause.tables.items[0].name);
    const setArgs = [];
    
    for (const a of setClause.assignments.items) {
        setArgs.push(binaryExpression('===', identifier(a.column.name), convertOperand(a.expr)));
    }
    
    const setCall = callExpression(identifier('set'), setArgs);
    
    const orAction = convertOrAction(updateClause.orAction);
    
    const args = [
        orAction,
        table,
        setCall,
        fromClause && convertFromClause(fromClause),
        whereClause && convertWhere(whereClause),
        returningClause && convertReturning(returningClause),
    ].filter(Boolean);
    
    return callExpression(identifier('update'), args);
};

const convertFromClause = (fromClause) => callExpression(identifier('updateFrom'), [
    identifier(fromClause.expr.name),
]);
