import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: delete', (t) => {
    t.transform('delete');
    t.end();
});

test('happy-sql: parser: clause: delete: delete-where-between', (t) => {
    t.transform('delete-where-between');
    t.end();
});

test('happy-sql: parser: clause: delete: delete-where-exists', (t) => {
    t.transform('delete-where-exists');
    t.end();
});
