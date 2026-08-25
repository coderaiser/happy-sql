import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: pragma-table-info', (t) => {
    t.transform('pragma-table-info');
    t.end();
});

test('happy-sql: parser: clause: pragma: pragma-user-version', (t) => {
    t.transform('pragma-user-version');
    t.end();
});

test('happy-sql: parser: clause: pragma: pragma-value', (t) => {
    t.transform('pragma-value');
    t.end();
});

test('happy-sql: parser: clause: pragma: pragma-qualified', (t) => {
    t.transform('pragma-qualified');
    t.end();
});

test('happy-sql: parser: clause: pragma: pragma-string-arg', (t) => {
    t.transform('pragma-string-arg');
    t.end();
});
