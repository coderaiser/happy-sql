import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: row-number', (t) => {
    t.transform('row-number');
    t.end();
});
