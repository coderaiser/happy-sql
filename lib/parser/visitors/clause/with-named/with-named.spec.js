import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: withNamed: with-named-select', (t) => {
    t.transform('with-named-select');
    t.end();
});

test('happy-sql: parser: with-recursive', (t) => {
    t.transform('with-recursive');
    t.end();
});

test('happy-sql: parser: withRecursive: with-recursive-no-columns', (t) => {
    t.transform('with-recursive-no-columns');
    t.end();
});

test('happy-sql: parser: withRecursive: with-recursive-multi', (t) => {
    t.transform('with-recursive-multi');
    t.end();
});
