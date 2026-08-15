import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: lastInsertRowid', (t) => {
    t.transform('lastInsertRowid');
    t.end();
});
