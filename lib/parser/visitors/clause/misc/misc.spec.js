import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: reindex', (t) => {
    t.transform('reindex');
    t.end();
});

test('happy-sql: parser: clause: analyze', (t) => {
    t.transform('analyze');
    t.end();
});

test('happy-sql: parser: clause: release-savepoint', (t) => {
    t.transform('release-savepoint');
    t.end();
});

test('happy-sql: parser: analyze-table', (t) => {
    t.transform('analyze-table');
    t.end();
});

test('happy-sql: parser: analyze-qualified', (t) => {
    t.transform('analyze-qualified');
    t.end();
});

test('happy-sql: parser: reindex-table', (t) => {
    t.transform('reindex-table');
    t.end();
});
