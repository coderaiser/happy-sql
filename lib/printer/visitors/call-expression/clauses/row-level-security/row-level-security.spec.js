import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: row-level-security', (t) => {
    t.transform('row-level-security');
    t.end();
});
