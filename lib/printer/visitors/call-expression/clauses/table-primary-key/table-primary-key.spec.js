import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: table-primary-key', (t) => {
    t.transform('table-primary-key');
    t.end();
});
