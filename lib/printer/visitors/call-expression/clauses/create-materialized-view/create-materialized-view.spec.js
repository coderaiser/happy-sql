import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-materialized-view', (t) => {
    t.transform('create-materialized-view');
    t.end();
});
