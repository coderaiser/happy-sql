import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: limit', (t) => {
    t.transform('limit');
    t.end();
});

test('happy-sql: printer: clause: limit-offset', (t) => {
    t.transform('limit-offset');
    t.end();
});
