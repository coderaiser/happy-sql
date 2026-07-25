import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: heading-h1', (t) => {
    t.noTransform('heading-h1');
    t.end();
});

test('happy-sql: printer: heading-h2', (t) => {
    t.noTransform('heading-h2');
    t.end();
});

test('happy-sql: printer: heading-h3', (t) => {
    t.noTransform('heading-h3');
    t.end();
});

test('happy-sql: printer: heading-multiple', (t) => {
    t.noTransform('heading-multiple');
    t.end();
});
