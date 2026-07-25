import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: insert', (t) => {
    t.transform('insert');
    t.end();
});

test('happy-sql: parser: clause: insert-multi', (t) => {
    t.transform('insert-multi');
    t.end();
});

test('happy-sql: parser: clause: insert-number', (t) => {
    t.transform('insert-number');
    t.end();
});

test('happy-sql: parser: clause: insert-string', (t) => {
    t.transform('insert-string');
    t.end();
});

test('happy-sql: parser: clause: insert-identifier', (t) => {
    t.transform('insert-identifier');
    t.end();
});
