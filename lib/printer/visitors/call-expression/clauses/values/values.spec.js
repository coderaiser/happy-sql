import {test} from 'supertape';
import {types} from '@putout/babel';
import {printSql} from '#printer';

const {
    file,
    program,
    expressionStatement,
    arrayExpression,
    callExpression,
    identifier,
    stringLiteral,
} = types;

test('happy-sql: printer: clause: values single', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('values'), [
                stringLiteral(':x'),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    
    t.equal(result, 'VALUES (:x)\n');
    t.end();
});

test('happy-sql: printer: clause: values multi', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('values'), [
                stringLiteral(':x'),
                stringLiteral(':y'),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    
    t.equal(result, 'VALUES (:x, :y)\n');
    t.end();
});
