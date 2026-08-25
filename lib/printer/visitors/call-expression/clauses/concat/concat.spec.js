import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: concat', (t) => {
    t.transform('concat');
    t.end();
});

test('happy-sql: printer: clause: concat-multi', (t) => {
    t.transform('concat-multi');
    t.end();
});
