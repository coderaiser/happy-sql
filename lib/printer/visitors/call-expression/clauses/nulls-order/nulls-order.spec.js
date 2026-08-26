import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: nulls-order', (t) => {
    t.transform('nulls-order');
    t.end();
});
