import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: select-fix', (t) => {
    t.transform('select');
    t.end();
});
// More printer specs are in clause subdirectories
