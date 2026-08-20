import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: join', (t) => {
    t.transform('join');
    t.end();
});

test('happy-sql: printer: clause: join-multi', (t) => {
    t.transform('join-multi');
    t.end();
});

test('happy-sql: printer: clause: join-bare', (t) => {
    t.transform('join-bare');
    t.end();
});
