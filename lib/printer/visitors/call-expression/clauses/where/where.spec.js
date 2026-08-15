import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: where', (t) => {
    t.transform('where');
    t.end();
});

test('happy-sql: printer: clause: where: where-ne', (t) => {
    t.transform('where-ne');
    t.end();
});

test('happy-sql: printer: clause: where: where-gte', (t) => {
    t.transform('where-gte');
    t.end();
});

test('happy-sql: printer: clause: where: where-like', (t) => {
    t.transform('where-like');
    t.end();
});

test('happy-sql: printer: clause: where: where-is-null', (t) => {
    t.transform('where-is-null');
    t.end();
});

test('happy-sql: printer: clause: where: where-is-not-null', (t) => {
    t.transform('where-is-not-null');
    t.end();
});

test('happy-sql: printer: clause: where: where-in', (t) => {
    t.transform('where-in');
    t.end();
});
