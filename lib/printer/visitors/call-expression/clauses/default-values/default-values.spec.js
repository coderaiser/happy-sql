import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: default-values', (t) => {
    t.transform('default-values');
    t.end();
});
