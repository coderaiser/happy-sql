import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-table-as', (t) => {
    t.transform('create-table-as');
    t.end();
});
