import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: code-lang', (t) => {
    t.transform('code-lang');
    t.end();
});

test('happy-sql: parser: code-no-lang', (t) => {
    t.transform('code-no-lang');
    t.end();
});

test('happy-sql: parser: code-multiline', (t) => {
    t.transform('code-multiline');
    t.end();
});
