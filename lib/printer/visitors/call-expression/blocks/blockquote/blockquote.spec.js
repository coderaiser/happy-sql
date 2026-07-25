import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: blockquote', (t) => {
    t.noTransform('blockquote');
    t.end();
});

test('happy-sql: printer: blockquote-nested', (t) => {
    t.transform('blockquote-nested');
    t.end();
});

test('happy-sql: printer: blockquote-multiple', (t) => {
    t.noTransform('blockquote-multiple');
    t.end();
});

test('happy-sql: printer: blockquote-multiple-bold', (t) => {
    t.noTransform('blockquote-multiple-bold');
    t.end();
});
