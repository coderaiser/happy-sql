import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: withNamed: select body', (t) => {
    t.transform('with-named-select');
    t.end();
});

test('happy-sql: parser: withRecursive', (t) => {
    t.transform('with-recursive');
    t.end();
});

test('happy-sql: parser: withRecursive: no columns', (t) => {
    t.transform('with-recursive-no-columns');
    t.end();
});

test('happy-sql: parser: withRecursive: multi', (t) => {
    t.transform('with-recursive-multi');
    t.end();
});

