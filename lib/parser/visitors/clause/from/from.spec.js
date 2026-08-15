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
