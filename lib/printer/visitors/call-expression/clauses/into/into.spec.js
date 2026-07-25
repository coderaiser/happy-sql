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

test('happy-sql: printer: clause: into single col', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('into'), [
                identifier('t'),
                identifier('x'),
                callExpression(identifier('values'), [
                    stringLiteral(':x'),
                ]),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    
    t.equal(result, 'INSERT INTO t (x) VALUES (:x)\n');
    t.end();
});

test('happy-sql: printer: clause: into multi col', (t) => {
    const ast = file(program([
        expressionStatement(arrayExpression([
            callExpression(identifier('into'), [
                identifier('t'),
                arrayExpression([
                    identifier('x'),
                    identifier('y'),
                ]),
                callExpression(identifier('values'), [
                    stringLiteral(':x'),
                    stringLiteral(':y'),
                ]),
            ]),
        ])),
    ]));
    
    const result = printSql(ast);
    
    t.equal(result, 'INSERT INTO t (x, y) VALUES (:x, :y)\n');
    t.end();
});
