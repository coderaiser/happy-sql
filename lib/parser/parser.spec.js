import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: parser: section-multi', (t) => {
    t.transform('section-multi');
    t.end();
});

test('happy-sql: parser: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('happy-sql: parser: with-named', (t) => {
    t.transform('with-named');
    t.end();
});
// More parser specs are in clause subdirectories
