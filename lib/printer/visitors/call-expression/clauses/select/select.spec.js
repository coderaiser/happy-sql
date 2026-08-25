import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: printer: clause: string', (t) => {
    t.transform('string');
    t.end();
});

test('happy-sql: printer: clause: select: select-unary', (t) => {
    t.transform('select-unary');
    t.end();
});

test('happy-sql: printer: clause: select: select-not', (t) => {
    t.transform('select-not');
    t.end();
});

test('happy-sql: printer: clause: select: select-between', (t) => {
    t.transform('select-between');
    t.end();
});

test('happy-sql: printer: clause: select: select-exists-column', (t) => {
    t.transform('select-exists-column');
    t.end();
});

test('happy-sql: printer: clause: select: select-scalar-subquery', (t) => {
    t.transform('select-scalar-subquery');
    t.end();
});

test('happy-sql: printer: clause: select: select-array-cast', (t) => {
    t.transform('select-array-cast');
    t.end();
});

test('happy-sql: printer: clause: select: select-subscript', (t) => {
    t.transform('select-subscript');
    t.end();
});

test('happy-sql: printer: clause: select: select-qualified-table', (t) => {
    t.transform('select-qualified-table');
    t.end();
});

test('happy-sql: printer: clause: select: select-quoted-identifier', (t) => {
    t.transform('select-quoted-identifier');
    t.end();
});
