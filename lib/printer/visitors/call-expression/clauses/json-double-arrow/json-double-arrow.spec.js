import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: json-double-arrow', (t) => {
    t.transform('json-double-arrow');
    t.end();
});
