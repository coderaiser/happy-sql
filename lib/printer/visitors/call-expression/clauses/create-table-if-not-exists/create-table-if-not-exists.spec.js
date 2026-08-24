import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-table-if-not-exists', (t) => {
    t.transform('create-table-if-not-exists');
    t.end();
});
