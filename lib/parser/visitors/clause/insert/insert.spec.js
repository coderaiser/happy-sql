import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: insert', (t) => {
    t.transform('insert');
    t.end();
});

test('happy-sql: parser: clause: insert-or-replace', (t) => {
    t.transform('insert-or-replace');
    t.end();
});

test('happy-sql: parser: clause: insert-or-ignore', (t) => {
    t.transform('insert-or-ignore');
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

test('happy-sql: parser: clause: insert-returning', (t) => {
    t.transform('insert-returning');
    t.end();
});

test('happy-sql: parser: clause: insert-returning-id', (t) => {
    t.transform('insert-returning-id');
    t.end();
});

test('happy-sql: parser: clause: insert-returning-conflict', (t) => {
    t.transform('insert-returning-conflict');
    t.end();
});

test('happy-sql: parser: clause: insert-returning-star', (t) => {
    t.transform('insert-returning-star');
    t.end();
});
