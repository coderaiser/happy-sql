import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: reindex', (t) => {
    t.transform('reindex');
    t.end();
});

test('happy-sql: printer: clause: reindex-table', (t) => {
    t.transform('reindex-table');
    t.end();
});
