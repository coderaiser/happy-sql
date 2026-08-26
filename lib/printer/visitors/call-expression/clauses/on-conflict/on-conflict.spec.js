import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: on-conflict', (t) => {
    t.transform('on-conflict');
    t.end();
});

test('happy-sql: printer: clause: on-conflict-multi', (t) => {
    t.transform('on-conflict-multi');
    t.end();
});

test('happy-sql: printer: clause: on-conflict-where', (t) => {
    t.transform('on-conflict-where');
    t.end();
});
