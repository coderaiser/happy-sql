import {types} from '@putout/babel';
import {parse} from 'sql-parser-cst';
import {convertClause} from '#parser/clause';
import {findClause} from '#parser/clause/find';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const BODY = /^\s*BEGIN([\s\S]*?)(?:RETURN\s+(OLD|NEW|NULL)\s*;)?\s*END\s*;?\s*$/i;

const isStatement = ({type}) => type !== 'empty';

const call = (name, args = []) => callExpression(identifier(name), args);

const convertBody = (source) => {
    const match = BODY.exec(source);
    
    if (!match)
        throw Error('CREATE FUNCTION body without BEGIN ... END not supported yet');
    
    const [, statements, returned] = match;
    
    const {statements: list} = parse(statements, {
        dialect: 'postgresql',
        paramTypes: [':name'],
    });
    
    const elements = list
        .filter(isStatement)
        .map(convertClause);
    
    if (returned)
        elements.push(call(`return${returned[0]}${returned
            .slice(1)
            .toLowerCase()}`));
    
    return arrayExpression(elements);
};

export const convertCreateFunction = (stmt) => {
    if (stmt.params.expr.items.length)
        throw Error('CREATE FUNCTION with parameters not supported yet');
    
    const returns = findClause(stmt.clauses, 'returns_clause');
    const language = findClause(stmt.clauses, 'language_clause');
    const as = findClause(stmt.clauses, 'as_clause');
    
    const args = [
        identifier(stmt.name.name),
        call('returns', [
            identifier(returns.dataType.name),
        ]),
        call('language', [
            identifier(language.name.name),
        ]),
    ];
    
    if (stmt.orReplaceKw)
        args.push(call('orReplace'));
    
    args.push(convertBody(as.expr.value));
    
    return call('createFunction', args);
};
