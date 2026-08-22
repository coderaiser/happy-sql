import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: returning', (t) => {
    t.transform('returning');
    t.end();
});

test('happy-sql: printer: clause: returning-id', (t) => {
    t.transform('returning-id');
    t.end();
});

test('happy-sql: printer: clause: returning-conflict', (t) => {
    t.transform('returning-conflict');
    t.end();
});

test('happy-sql: printer: clause: returning-multi', (t) => {
    t.transform('returning-multi');
    t.end();
});

test('happy-sql: printer: clause: returning-star', (t) => {
    t.transform('returning-star');
    t.end();
});
