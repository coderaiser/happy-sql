import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: withNamed', (t) => {
    t.transform('withNamed');
    t.end();
});

test('happy-sql: printer: clause: with-named-insert', (t) => {
    t.transform('with-named-insert');
    t.end();
});

test('happy-sql: printer: clause: withNamed: select body', (t) => {
    t.transform('with-named-select');
    t.end();
});
