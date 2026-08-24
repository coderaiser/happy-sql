import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-index', (t) => {
    t.transform('create-index');
    t.end();
});

test('happy-sql: printer: clause: create-unique-index', (t) => {
    t.transform('create-unique-index');
    t.end();
});
