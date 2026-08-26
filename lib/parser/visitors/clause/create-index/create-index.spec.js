import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-index', (t) => {
    t.transform('create-index');
    t.end();
});

test('happy-sql: parser: clause: create-unique-index', (t) => {
    t.transform('create-unique-index');
    t.end();
});

test('happy-sql: parser: clause: create-index-if-not-exists', (t) => {
    t.transform('create-index-if-not-exists');
    t.end();
});

test('happy-sql: parser: clause: create-index-concurrently', (t) => {
    t.transform('create-index-concurrently');
    t.end();
});

test('happy-sql: parser: clause: create-index-where', (t) => {
    t.transform('create-index-where');
    t.end();
});

test('happy-sql: parser: clause: create-index-where-complex', (t) => {
    t.transform('create-index-where-complex');
    t.end();
});

test('happy-sql: parser: clause: create-index-where-postfix', (t) => {
    t.transform('create-index-where-postfix');
    t.end();
});

test('happy-sql: parser: clause: create-index: create-index-desc', (t) => {
    t.transform('create-index-desc');
    t.end();
});

test('happy-sql: parser: clause: create-index: create-index-method', (t) => {
    t.transform('create-index-method');
    t.end();
});
