import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-view', (t) => {
    t.transform('create-view');
    t.end();
});

test('happy-sql: parser: clause: create-materialized-view', (t) => {
    t.transform('create-materialized-view');
    t.end();
});
