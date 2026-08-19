import {test} from 'supertape';
import {types} from '@putout/babel';
import {printSql} from '#printer';
import {convertJsToSql} from '#happy-sql';
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
    
    t.equal(result, `VALUES (':x')\n`);
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
    
    t.equal(result, `VALUES (':x', ':y')\n`);
    t.end();
});

test('happy-sql: printer: values: preserves string param quotes', (t) => {
    const result = convertJsToSql(`[values(':file', ':parent_id')]`);
    
    t.equal(result, `VALUES (':file', ':parent_id')\n`);
    t.end();
});

printerTest('happy-sql: printer: values: transform: quoted', (t) => {
    t.transform('values-quoted');
    t.end();
});
