import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: order-by', (t) => {
    t.transform('order-by');
    t.end();
});

test('happy-sql: printer: clause: order-by: multi', (t) => {
    t.transform('order-by-multi');
    t.end();
});
