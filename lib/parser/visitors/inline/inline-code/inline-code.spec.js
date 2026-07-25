import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: inline-code', (t) => {
    t.transform('inline-code');
    t.end();
});

test('happy-sql: parser: inline-code-nested', (t) => {
    t.transform('inline-code-nested');
    t.end();
});
