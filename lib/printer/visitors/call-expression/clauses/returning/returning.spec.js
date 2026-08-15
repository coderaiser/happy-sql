import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: returning-fix', (t) => {
    t.transform('returning');
    t.end();
});

test('happy-sql: printer: clause: returning-id-fix', (t) => {
    t.transform('returning-id');
    t.end();
});

test('happy-sql: printer: clause: returning-conflict-fix', (t) => {
    t.transform('returning-conflict');
    t.end();
});

test('happy-sql: printer: clause: returning-multi-fix', (t) => {
    t.transform('returning-multi');
    t.end();
});
