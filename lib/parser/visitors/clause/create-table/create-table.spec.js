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

test('happy-sql: parser: clause: create-table-nextval', (t) => {
    t.transform('create-table-nextval');
    t.end();
});

test('happy-sql: parser: clause: create-table-default', (t) => {
    t.transform('create-table-default');
    t.end();
});

test('happy-sql: parser: clause: create-table-not-null', (t) => {
    t.transform('create-table-not-null');
    t.end();
});

test('happy-sql: parser: clause: create-table-default-int', (t) => {
    t.transform('create-table-default-int');
    t.end();
});

test('happy-sql: parser: clause: create-table-unique', (t) => {
    t.transform('create-table-unique');
    t.end();
});

test('happy-sql: parser: clause: create-table-check', (t) => {
    t.transform('create-table-check');
    t.end();
});

test('happy-sql: parser: clause: create-table-references', (t) => {
    t.transform('create-table-references');
    t.end();
});

test('happy-sql: parser: clause: create-table-if-not-exists', (t) => {
    t.transform('create-table-if-not-exists');
    t.end();
});
