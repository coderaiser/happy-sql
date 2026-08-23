import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: drop-table', (t) => {
    t.transform('drop-table');
    t.end();
});

test('happy-sql: printer: clause: drop-table-multi', (t) => {
    t.transform('drop-table-multi');
    t.end();
});

test('happy-sql: printer: clause: drop-table-if-exists', (t) => {
    t.transform('drop-table-if-exists');
    t.end();
});
