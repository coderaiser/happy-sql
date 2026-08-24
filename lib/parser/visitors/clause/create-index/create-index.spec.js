import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-index', (t) => {
    t.transform('create-index');
    t.end();
});

test('happy-sql: parser: clause: create-unique-index', (t) => {
    t.transform('create-unique-index');
    t.end();
});
