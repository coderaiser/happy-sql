import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: union-all', (t) => {
    t.transform('union-all');
    t.end();
});

test('happy-sql: parser: union-distinct', (t) => {
    t.transform('union-distinct');
    t.end();
});

test('happy-sql: parser: intersect', (t) => {
    t.transform('intersect');
    t.end();
});

test('happy-sql: parser: except', (t) => {
    t.transform('except');
    t.end();
});
