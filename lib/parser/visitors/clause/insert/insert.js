import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertSet} from '#parser/clause/set';
import {convertSelect} from '#parser/clause/select';
import {convertReturning} from '#parser/clause/returning';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const convertExprToIdentifier = ({expr}) => identifier(expr.name);
const convertColToIdentifier = ({name}) => identifier(name);

const OR_ACTION_MAP = {
    REPLACE: 'orReplace',
    IGNORE: 'orIgnore',
};

const convertOrAction = ({actionKw}) => callExpression(identifier(OR_ACTION_MAP[actionKw.name]), []);

const convertRowItems = (paren) => {
    const args = [];
    
    for (const item of paren.expr.items)
        args.push(convertOperand(item));
    
    return args;
};

const convertRow = (paren) => callExpression(identifier('row'), convertRowItems(paren));

const convertSource = (vc) => {
    if (vc.type === 'select_stmt')
        return convertSelect(vc);
    
    const rows = vc.values.items;
    
    if (rows.length === 1)
        return callExpression(identifier('values'), convertRowItems(rows[0]));
    
    const rowArgs = [];
    
    for (const row of rows)
        rowArgs.push(convertRow(row));
    
    return callExpression(identifier('values'), rowArgs);
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
    const colArg = cols.length === 1 ? identifier(cols[0].name) : arrayExpression(cols.map(convertColToIdentifier));
    const source = convertSource(vc);
    
    const args = [
        ic.orAction && convertOrAction(ic.orAction),
        callExpression(identifier('into'), [
            identifier(ic.table.name),
            colArg,
            source,
        ]),
        uc && convertUpsert(uc),
        rc && convertReturning(rc),
    ].filter(Boolean);
    
    return callExpression(identifier('insert'), args);
};
