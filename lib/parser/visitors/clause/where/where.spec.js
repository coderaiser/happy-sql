import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: where', (t) => {
    t.transform('where');
    t.end();
});

test('happy-sql: parser: clause: where-number', (t) => {
    t.transform('where-number');
    t.end();
});

test('happy-sql: parser: clause: where-or', (t) => {
    t.transform('where-or');
    t.end();
});

test('happy-sql: parser: clause: where-not-eq', (t) => {
    t.transform('where-not-eq');
    t.end();
});

test('happy-sql: parser: clause: where-gte', (t) => {
    t.transform('where-gte');
    t.end();
});

test('happy-sql: parser: clause: where-is-null', (t) => {
    t.transform('where-is-null');
    t.end();
});

test('happy-sql: parser: clause: where-is-not-null', (t) => {
    t.transform('where-is-not-null');
    t.end();
});

test('happy-sql: parser: clause: where-like', (t) => {
    t.transform('where-like');
    t.end();
});

test('happy-sql: parser: clause: where-in', (t) => {
    t.transform('where-in');
    t.end();
});

test('happy-sql: parser: clause: where-compare', (t) => {
    t.transform('where-compare');
    t.end();
});

test('happy-sql: parser: clause: where-member', (t) => {
    t.transform('where-member');
    t.end();
});

test('happy-sql: parser: clause: where-boolean', (t) => {
    t.transform('where-boolean');
    t.end();
});

test('happy-sql: parser: clause: where-null', (t) => {
    t.transform('where-null');
    t.end();
});

test('happy-sql: parser: clause: where: where-not-in', (t) => {
    t.transform('where-not-in');
    t.end();
});

test('happy-sql: parser: clause: where: where-in-subquery', (t) => {
    t.transform('where-in-subquery');
    t.end();
});

test('happy-sql: parser: clause: where: where-between', (t) => {
    t.transform('where-between');
    t.end();
});

test('happy-sql: parser: clause: where: where-exists', (t) => {
    t.transform('where-exists');
    t.end();
});
