import test from 'supertape';
import {types} from '@putout/babel';
import {printSql} from '#printer';

const {
    file,
    program,
    expressionStatement,
    callExpression,
    identifier,
} = types;

test('happy-sql: printer: clause: generic call', (t) => {
    const ast = file(program([
        expressionStatement(callExpression(identifier('unknown'), [])),
    ]));
    
    const result = printSql(ast);
    
    t.equal(result, 'unknown()\n');
    t.end();
});
