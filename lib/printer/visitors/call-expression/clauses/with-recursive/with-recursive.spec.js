import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: withRecursive', (t) => {
    t.transform('with-recursive');
    t.end();
});

test('happy-sql: printer: clause: withRecursive: no columns', (t) => {
    t.transform('with-recursive-no-columns');
    t.end();
});

test('happy-sql: printer: clause: withRecursive: multi', (t) => {
    t.transform('with-recursive-multi');
    t.end();
});
