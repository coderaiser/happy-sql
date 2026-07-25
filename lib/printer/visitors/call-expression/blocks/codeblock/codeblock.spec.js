import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: codeblock-and-heading', (t) => {
    t.noTransform('codeblock-and-heading');
    t.end();
});

test('happy-sql: printer: codeblock-and-text', (t) => {
    t.noTransform('codeblock-and-text');
    t.end();
});
