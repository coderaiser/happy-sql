import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: update', (t) => {
    t.transform('update');
    t.end();
});

test('happy-sql: printer: clause: update-returning', (t) => {
    t.transform('update-returning');
    t.end();
});
