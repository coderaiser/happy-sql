import {types} from '@putout/babel';

const {
    identifier,
    stringLiteral,
    binaryExpression,
    arrayExpression,
    callExpression,
} = types;

const convertOperand = (node) => {
    if (node.type === 'parameter')
        return stringLiteral(node.text);
    
    if (node.type === 'number_literal')
        return types.numericLiteral(node.value);
    
    if (node.type === 'string_literal')
        return stringLiteral(node.value);
    
    return identifier(node.name);
};

const convertSet = (setClause) => {
    const args = [];
    
    for (const a of setClause.assignments.items) {
        args.push(binaryExpression('===', identifier(a.column.name), convertOperand(a.expr)));
    }
    
    return callExpression(identifier('set'), args);
};

const convertUpsert = (upsertClause) => {
    const target = upsertClause.conflictTarget;
    const {action} = upsertClause;
    
    const targetArgs = target ? target.expr.items.map((i) => identifier(i.expr.name)) : [];
    const actionNode = action.type === 'upsert_action_nothing' ? identifier('nothing') : convertSet(action.set);
    
    return callExpression(identifier('onConflict'), [...targetArgs, actionNode]);
};

export const convertInsert = ({clauses}) => {
    const [ic] = clauses;
    const [, vc] = clauses;
    const uc = clauses.find((c) => c.type === 'upsert_clause');
    
    const cols = ic.columns.expr.items;
    const vals = vc.values.items[0].expr.items;
    
    const colArg = cols.length === 1 ? identifier(cols[0].name) : arrayExpression(cols.map((c) => identifier(c.name)));
    
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
    ].filter(Boolean);
    
    return callExpression(identifier('insert'), args);
};
