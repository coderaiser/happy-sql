import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: update', (t) => {
    t.transform('update');
    t.end();
});

test('happy-sql: parser: clause: update-no-where', (t) => {
    t.transform('update-no-where');
    t.end();
});

test('happy-sql: parser: clause: update-string', (t) => {
    t.transform('update-string');
    t.end();
});

test('happy-sql: parser: clause: update-identifier', (t) => {
    t.transform('update-identifier');
    t.end();
});

test('happy-sql: parser: clause: update-number', (t) => {
    t.transform('update-number');
    t.end();
});

test('happy-sql: parser: clause: update-where-is-null', (t) => {
    t.transform('update-where-is-null');
    t.end();
});

test('happy-sql: parser: clause: update-where-is-not-null', (t) => {
    t.transform('update-where-is-not-null');
    t.end();
});

test('happy-sql: parser: clause: update-where-in', (t) => {
    t.transform('update-where-in');
    t.end();
});

test('happy-sql: parser: clause: update-where-like', (t) => {
    t.transform('update-where-like');
    t.end();
});

test('happy-sql: parser: clause: update-where-and', (t) => {
    t.transform('update-where-and');
    t.end();
});

test('happy-sql: parser: clause: update-where-or', (t) => {
    t.transform('update-where-or');
    t.end();
});

test('happy-sql: parser: clause: update: update-where-not-in', (t) => {
    t.transform('update-where-not-in');
    t.end();
});

test('happy-sql: parser: clause: update: update-where-in-subquery', (t) => {
    t.transform('update-where-in-subquery');
    t.end();
});

test('happy-sql: parser: clause: update: update-from', (t) => {
    t.transform('update-from');
    t.end();
});
