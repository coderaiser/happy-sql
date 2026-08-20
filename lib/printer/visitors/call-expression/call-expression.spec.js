import test from 'supertape';
import {types} from '@putout/babel';
import {tryCatch} from 'try-catch';
import {printSql} from '#printer';

const {
    file,
    program,
    expressionStatement,
    callExpression,
    identifier,
} = types;

test('happy-sql: printer: clause: unsupported call throws', (t) => {
    const ast = file(program([
        expressionStatement(callExpression(identifier('unknown'), [])),
    ]));
    
    const [error] = tryCatch(printSql, ast);
    
    t.match(error.message, 'unknown not supported yet');
    t.end();
});