import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: array-type', (t) => {
    t.transform('array-type');
    t.end();
});
