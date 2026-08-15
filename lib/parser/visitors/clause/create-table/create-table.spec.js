import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-table-autoincrement', (t) => {
    t.transform('create-table-autoincrement');
    t.end();
});

test('happy-sql: parser: clause: create-table-serial', (t) => {
    t.transform('create-table-serial');
    t.end();
});

test('happy-sql: parser: clause: create-table-identity-always', (t) => {
    t.transform('create-table-identity-always');
    t.end();
});

test('happy-sql: parser: clause: create-table-identity-by-default', (t) => {
    t.transform('create-table-identity-by-default');
    t.end();
});
