import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: order-by', (t) => {
    t.transform('order-by');
    t.end();
});

test('happy-sql: printer: clause: order-by: order-by-multi', (t) => {
    t.transform('order-by-multi');
    t.end();
});

test('happy-sql: printer: clause: order-by: order-by-ordinal', (t) => {
    t.transform('order-by-ordinal');
    t.end();
});

test('happy-sql: printer: clause: order-by: order-by-nulls-first', (t) => {
    t.transform('order-by-nulls-first');
    t.end();
});

test('happy-sql: printer: clause: order-by: order-by-nulls-desc', (t) => {
    t.transform('order-by-nulls-desc');
    t.end();
});
