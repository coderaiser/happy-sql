import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: table-unique', (t) => {
    t.transform('table-unique');
    t.end();
});
