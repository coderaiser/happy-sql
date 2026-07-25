import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: link: link-reference', (t) => {
    t.noTransform('link-reference');
    t.end();
});

test('happy-sql: printer: link-title', (t) => {
    t.noTransform('link-title');
    t.end();
});

test('happy-sql: printer: link-suffix', (t) => {
    t.noTransform('link-suffix');
    t.end();
});
