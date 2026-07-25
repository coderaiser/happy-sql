import {test} from 'supertape';
import {types} from '@putout/babel';
import {printSql} from '#printer';

const {file, program, expressionStatement, arrayExpression, callExpression, identifier, stringLiteral, binaryExpression} = types;

test('happy-sql: printer: clause: set single', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('set'), [
                binaryExpression('===', identifier('x'), stringLiteral(':x')),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    t.equal(result, 'SET x = :x\n');
    t.end();
});

test('happy-sql: printer: clause: set multi', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('set'), [
                binaryExpression('===', identifier('x'), stringLiteral(':x')),
                binaryExpression('===', identifier('y'), stringLiteral(':y')),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    t.equal(result, 'SET x = :x, y = :y\n');
    t.end();
});
