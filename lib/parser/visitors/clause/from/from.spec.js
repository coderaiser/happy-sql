import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: from', (t) => {
    t.transform('from');
    t.end();
});

test('happy-sql: parser: clause: from: join', (t) => {
    t.transform('join');
    t.end();
});

test('happy-sql: parser: clause: from: join-multi', (t) => {
    t.transform('join-multi');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-param', (t) => {
    t.transform('join-on-param');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-number', (t) => {
    t.transform('join-on-number');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-or', (t) => {
    t.transform('join-on-or');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-not-eq', (t) => {
    t.transform('join-on-not-eq');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-in', (t) => {
    t.transform('join-on-in');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-like', (t) => {
    t.transform('join-on-like');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-is-null', (t) => {
    t.transform('join-on-is-null');
    t.end();
});

test('happy-sql: parser: clause: from: join-on-is-not-null', (t) => {
    t.transform('join-on-is-not-null');
    t.end();
});

test('happy-sql: parser: clause: from: from-where', (t) => {
    t.transform('from-where');
    t.end();
});

test('happy-sql: parser: clause: from: group-by', (t) => {
    t.transform('group-by');
    t.end();
});

test('happy-sql: parser: clause: from: group-by-multi', (t) => {
    t.transform('group-by-multi');
    t.end();
});

test('happy-sql: parser: clause: from: group-by-having', (t) => {
    t.transform('group-by-having');
    t.end();
});

test('happy-sql: parser: clause: from: group-by-sum', (t) => {
    t.transform('group-by-sum');
    t.end();
});

test('happy-sql: parser: clause: from: group-by-sum-having', (t) => {
    t.transform('group-by-sum-having');
    t.end();
});
