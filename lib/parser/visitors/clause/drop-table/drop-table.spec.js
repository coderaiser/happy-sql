import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: drop-table', (t) => {
    t.transform('drop-table');
    t.end();
});

test('happy-sql: parser: clause: drop-table-multi', (t) => {
    t.transform('drop-table-multi');
    t.end();
});

test('happy-sql: parser: clause: drop-table-if-exists', (t) => {
    t.transform('drop-table-if-exists');
    t.end();
});
