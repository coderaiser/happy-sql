import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: select', (t) => {
    t.transform('select');
    t.end();
});
// More parser specs are in clause subdirectories
