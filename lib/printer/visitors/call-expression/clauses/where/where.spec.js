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

test('happy-sql: printer: clause: where: where-like-escape', (t) => {
    t.transform('where-like-escape');
    t.end();
});

test('happy-sql: printer: clause: where: where-paren-or-right', (t) => {
    t.transform('where-paren-or-right');
    t.end();
});

test('happy-sql: printer: clause: where: where-paren-or-left', (t) => {
    t.transform('where-paren-or-left');
    t.end();
});

test('happy-sql: printer: clause: where: where-not-paren', (t) => {
    t.transform('where-not-paren');
    t.end();
});

test('happy-sql: printer: clause: where: where-is-not-value', (t) => {
    t.transform('where-is-not-value');
    t.end();
});

test('happy-sql: printer: clause: where: where-is-value', (t) => {
    t.transform('where-is-value');
    t.end();
});

test('happy-sql: printer: clause: where: where-paren-arithmetic', (t) => {
    t.transform('where-paren-arithmetic');
    t.end();
});

test('happy-sql: printer: clause: where: where-in-star', (t) => {
    t.transform('where-in-star');
    t.end();
});
