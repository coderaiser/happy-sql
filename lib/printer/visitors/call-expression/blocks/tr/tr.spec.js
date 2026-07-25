import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: tr', (t) => {
    t.transform('tr');
    t.end();
});

test('happy-sql: printer: tr-inline', (t) => {
    t.transform('tr-inline');
    t.end();
});

test('happy-sql: printer: tr-link', (t) => {
    t.transform('tr-link');
    t.end();
});
