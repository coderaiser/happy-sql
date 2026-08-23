import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: begin', (t) => {
    t.transform('begin');
    t.end();
});

test('happy-sql: parser: clause: commit', (t) => {
    t.transform('commit');
    t.end();
});

test('happy-sql: parser: clause: rollback', (t) => {
    t.transform('rollback');
    t.end();
});

test('happy-sql: parser: clause: savepoint', (t) => {
    t.transform('savepoint');
    t.end();
});

test('happy-sql: parser: clause: rollback-to', (t) => {
    t.transform('rollback-to');
    t.end();
});
