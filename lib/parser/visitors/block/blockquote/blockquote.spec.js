import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: blockquote', (t) => {
    t.transform('blockquote');
    t.end();
});

test('happy-sql: parser: blockquote-multi', (t) => {
    t.transform('blockquote-multi');
    t.end();
});

test('happy-sql: parser: blockquote-bold', (t) => {
    t.transform('blockquote-bold');
    t.end();
});
