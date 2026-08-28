import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertSet} from '#parser/clause/set';
import {convertSelect} from '#parser/clause/select';
import {convertReturning} from '#parser/clause/returning';
import {convertCondition} from '#parser/clause/where';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    callExpression,
    arrayExpression,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
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

const getTargetArgs = (target) => {
    if (!target)
        return [];
    
    const args = [];
    
    for (const item of target.expr.items)
        args.push(convertExprToIdentifier(item));
    
    return args;
};

const convertUpsertAction = (action) => {
    if (action.type === 'upsert_action_nothing')
        return identifier('nothing');
    
    return convertSet(action.set);
};

const convertUpsert = (upsertClause) => {
    const target = upsertClause.conflictTarget;
    const {action} = upsertClause;
    
    const targetArgs = getTargetArgs(target);
    const actionNode = convertUpsertAction(action);
    
    if (upsertClause.where)
        targetArgs.push(callExpression(identifier('where'), [
            convertCondition(upsertClause.where.expr),
        ]));
    
    return callExpression(identifier('onConflict'), [...targetArgs, actionNode]);
};

const isReplaceInto = ({insertKw, orAction}) => !orAction && insertKw && insertKw.name === 'REPLACE';

const colsToArg = (cols) => {
    if (cols.length === 1)
        return identifier(cols[0].name);
    
    const args = [];
    
    for (const col of cols)
        args.push(convertColToIdentifier(col));
    
    return arrayExpression(args);
};

const convertReplaceInto = ({clauses}) => {
    const ic = findClause(clauses, 'insert_clause');
    const rc = findClause(clauses, 'returning_clause');
    
    const cols = ic.columns.expr.items;
    const colArg = colsToArg(cols);
    const source = convertSource(findClause(clauses, 'values_clause'));
    
    return callExpression(identifier('replaceInto'), [
        callExpression(identifier('into'), [
            identifier(ic.table.name),
            colArg,
            source,
        ]),
        rc && convertReturning(rc),
    ].filter(Boolean));
};

const getSource = (dc, vc) => {
    if (dc)
        return callExpression(identifier('defaultValues'), []);
    
    return convertSource(vc);
};

export const convertInsert = (stmt) => {
    if (isReplaceInto(stmt.clauses[0]))
        return convertReplaceInto(stmt);
    
    const {clauses} = stmt;
    const [ic] = clauses;
    const [, vc] = clauses;
    const uc = findClause(clauses, 'upsert_clause');
    const rc = findClause(clauses, 'returning_clause');
    const dc = findClause(clauses, 'default_values');
    
    const colArgs = convertColumns(ic);
    const source = getSource(dc, vc);
    
    const args = [
        ic.orAction && convertOrAction(ic.orAction),
        callExpression(identifier('into'), [
            convertTable(ic),
            ...colArgs,
            source,
        ]),
        uc && convertUpsert(uc),
        rc && convertReturning(rc),
    ].filter(Boolean);
    
    return callExpression(identifier('insert'), args);
};

const isAliasTable = ({table}) => table.type === 'alias';

const convertTable = (ic) => {
    if (!isAliasTable(ic))
        return identifier(ic.table.name);
    
    const {expr, alias} = ic.table;
    
    return tsAsExpression(identifier(expr.name), tsLiteralType(stringLiteral(alias.name)));
};

const convertColumns = (ic) => {
    const columns = ic.columns || ic.table.columnAliases;
    
    if (!columns)
        return [];
    
    const cols = columns.expr.items;
    const colArg = colsToArg(cols);
    
    return [
        colArg,
    ];
};
