import {test} from 'supertape';
import {types} from '@putout/babel';
import {printSql} from '#printer';
import {createTest as createPrinterTest} from '#printer/test';

const printerTest = createPrinterTest(import.meta.url);

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
    
    // :x is a named parameter placeholder — a convention supported by SQLite,
    // libsql, postgres, and other drivers. It is NOT a string literal.
    // VALUES (':x') passes the string ":x" to the driver with no substitution.
    // VALUES (:x) lets the driver bind the :x param from the params object.
    // StringLiteral visitor already handles the ':' prefix correctly by writing
    // the value without quotes. values.js must delegate to traverse() and must
    // not implement its own quoting — that was the bug this test guards against.
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

printerTest('happy-sql: printer: values: named params roundtrip', (t) => {
    t.transform('values-quoted');
    t.end();
});
