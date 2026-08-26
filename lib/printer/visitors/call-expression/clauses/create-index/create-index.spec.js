import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-index', (t) => {
    t.transform('create-index');
    t.end();
});

test('happy-sql: printer: clause: create-index-columns', (t) => {
    t.transform('create-index-columns');
    t.end();
});

test('happy-sql: printer: clause: create-unique-index', (t) => {
    t.transform('create-unique-index');
    t.end();
});

test('happy-sql: printer: clause: create-unique-index-columns', (t) => {
    t.transform('create-unique-index-columns');
    t.end();
});

test('happy-sql: printer: clause: create-index-if-not-exists', (t) => {
    t.transform('create-index-if-not-exists');
    t.end();
});

test('happy-sql: printer: clause: create-index-concurrently', (t) => {
    t.transform('create-index-concurrently');
    t.end();
});

test('happy-sql: printer: clause: create-index-where', (t) => {
    t.transform('create-index-where');
    t.end();
});

test('happy-sql: printer: clause: create-index-where-postfix', (t) => {
    t.transform('create-index-where-postfix');
    t.end();
});

test('happy-sql: printer: clause: createIndex: createIndexDesc', (t) => {
    t.transform('createIndexDesc');
    t.end();
});

test('happy-sql: printer: clause: createIndex: createIndexMethod', (t) => {
    t.transform('createIndexMethod');
    t.end();
});
