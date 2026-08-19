import {types} from '@putout/babel';
import {printSql} from '#printer';
import {createTest} from '#printer/test';

const {
    file,
    program,
    expressionStatement,
    arrayExpression,
    callExpression,
    identifier,
    stringLiteral,
} = types;

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: single-column', (t) => {
    t.transform('single-column');
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
