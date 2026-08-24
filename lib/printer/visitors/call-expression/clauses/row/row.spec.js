import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: row', (t) => {
    t.transform('row');
    t.end();
});
