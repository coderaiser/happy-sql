import {types} from '@putout/babel';
import camelCase from 'just-camel-case';
import {convertClause} from '#parser/clause';
import {findClause} from '#parser/clause/find';
import {convertCondition} from '#parser/clause/where';
import {convertOperand} from '#parser/clause/operand';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const getKeywords = (kw) => [kw]
    .flat()
    .map(({name}) => name);

const getTime = ({timeKw}) => timeKw ? getKeywords(timeKw) : ['BEFORE'];

const convertEvent = ({event, target, timeKw}) => {
    if (!event.eventKw)
        throw Error('CREATE TRIGGER with several events not supported yet');
    
    const name = camelCase([
        ...getTime({
            timeKw,
        }),
        event.eventKw.name,
    ].join(' '));
    
    const args = [
        identifier(target.table.name),
    ];
    
    if (event.columns)
        args.push(...event.columns.items.map(({name}) => identifier(name)));
    
    return callExpression(identifier(name), args);
};

const convertBody = (body) => {
    if (body.type === 'execute_clause')
        return callExpression(identifier('execute'), [
            identifier(body.name.name),
            ...body.args.expr.items.map(convertOperand),
        ]);
    
    const statements = body.program.statements.filter(isStatement);
    
    return arrayExpression(statements.map(convertClause));
};

const isStatement = ({type}) => type !== 'empty';

export const convertCreateTrigger = (stmt) => {
    const args = [
        identifier(stmt.name.name),
        convertEvent(stmt),
    ];
    
    if (stmt.ifNotExistsKw)
        args.push(callExpression(identifier('ifNotExists'), []));
    
    if (findClause(stmt.clauses, 'for_each_clause'))
        args.push(callExpression(identifier('forEachRow'), []));
    
    const whenClause = findClause(stmt.clauses, 'when_clause');
    
    if (whenClause)
        args.push(callExpression(identifier('when'), [
            convertCondition(whenClause.expr),
        ]));
    
    args.push(convertBody(stmt.body));
    
    return callExpression(identifier('createTrigger'), args);
};
