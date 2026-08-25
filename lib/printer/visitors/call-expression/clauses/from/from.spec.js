import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: from', (t) => {
    t.transform('from');
    t.end();
});

test('happy-sql: printer: clause: from: group-by-having', (t) => {
    t.transform('group-by-having');
    t.end();
});

test('happy-sql: printer: clause: from: generate-series', (t) => {
    t.transform('generate-series');
    t.end();
});

test('happy-sql: printer: from: func-call-alias', (t) => {
    t.transform('func-call-alias');
    t.end();
});
