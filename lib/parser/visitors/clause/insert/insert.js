import {types} from '@putout/babel';
import {convertSet} from '#parser/clause/set';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    callExpression,
    arrayExpression,
    stringLiteral,
} = types;

const convertExprToIdentifier = ({expr}) => identifier(expr.name);
const convertColToIdentifier = ({name}) => identifier(name);

const convertReturningItem = (item) => {
    if (item.type === 'alias') {
        const {name} = item.expr;
        const aliasName = item.alias.name;
        
        return callExpression(identifier('as'), [
            identifier(name),
            stringLiteral(aliasName),
        ]);
    }
    
    return identifier(item.name);
};

const convertReturning = (returningClause) => {
    const args = returningClause.columns.items.map(convertReturningItem);
    
    return callExpression(identifier('returning'), args);
};

const convertUpsert = (upsertClause) => {
    const target = upsertClause.conflictTarget;
    const {action} = upsertClause;
    
    const targetArgs = target ? target.expr.items.map(convertExprToIdentifier) : [];
    const actionNode = action.type === 'upsert_action_nothing' ? identifier('nothing') : convertSet(action.set);
    
    return callExpression(identifier('onConflict'), [...targetArgs, actionNode]);
};

export const convertInsert = ({clauses}) => {
    const [ic] = clauses;
    const [, vc] = clauses;
    const uc = findClause(clauses, 'upsert_clause');
    const rc = findClause(clauses, 'returning_clause');
    
    const cols = ic.columns.expr.items;
    const vals = vc.values.items[0].expr.items;
    const colArg = cols.length === 1 ? identifier(cols[0].name) : arrayExpression(cols.map(convertColToIdentifier));
    const valArgs = [];
    
    for (const p of vals) {
        valArgs.push(stringLiteral(p.text));
    }
    
    const args = [
        callExpression(identifier('into'), [
            identifier(ic.table.name),
            colArg,
            callExpression(identifier('values'), valArgs),
        ]),
        uc && convertUpsert(uc),
        rc && convertReturning(rc),
    ].filter(Boolean);
    
    return callExpression(identifier('insert'), args);
};
