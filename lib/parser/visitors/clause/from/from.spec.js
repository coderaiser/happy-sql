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

test('happy-sql: parser: clause: from: order-by', (t) => {
    t.transform('order-by');
    t.end();
});

test('happy-sql: parser: clause: from: order-by-desc', (t) => {
    t.transform('order-by-desc');
    t.end();
});

test('happy-sql: parser: clause: from: order-by-multi', (t) => {
    t.transform('order-by-multi');
    t.end();
});

test('happy-sql: parser: clause: from: group-by-order-by', (t) => {
    t.transform('group-by-order-by');
    t.end();
});

test('happy-sql: parser: clause: from: limit', (t) => {
    t.transform('limit');
    t.end();
});

test('happy-sql: parser: clause: from: limit-offset', (t) => {
    t.transform('limit-offset');
    t.end();
});

test('happy-sql: parser: clause: from: generate-series', (t) => {
    t.transform('generate-series');
    t.end();
});

test('happy-sql: parser: clause: from: json-each', (t) => {
    t.transform('json-each');
    t.end();
});

test('happy-sql: parser: clause: from: unnest', (t) => {
    t.transform('unnest');
    t.end();
});

test('happy-sql: parser: clause: from: left-join', (t) => {
    t.transform('left-join');
    t.end();
});

test('happy-sql: parser: clause: from: inner-join', (t) => {
    t.transform('inner-join');
    t.end();
});

test('happy-sql: parser: clause: from: right-join', (t) => {
    t.transform('right-join');
    t.end();
});

test('happy-sql: parser: clause: from: full-outer-join', (t) => {
    t.transform('full-outer-join');
    t.end();
});

test('happy-sql: parser: clause: from: natural-join', (t) => {
    t.transform('natural-join');
    t.end();
});

test('happy-sql: parser: clause: from: left-outer-join', (t) => {
    t.transform('left-outer-join');
    t.end();
});

test('happy-sql: parser: clause: from: subquery', (t) => {
    t.transform('subquery');
    t.end();
});

test('happy-sql: parser: clause: from: cross-join', (t) => {
    t.transform('cross-join');
    t.end();
});

test('happy-sql: parser: clause: from: lateral-join', (t) => {
    t.transform('lateral-join');
    t.end();
});

test('happy-sql: parser: clause: from: indexed-by', (t) => {
    t.transform('indexed-by');
    t.end();
});

test('happy-sql: parser: clause: from: not-indexed', (t) => {
    t.transform('not-indexed');
    t.end();
});

test('happy-sql: parser: from: func-call-alias', (t) => {
    t.transform('func-call-alias');
    t.end();
});
