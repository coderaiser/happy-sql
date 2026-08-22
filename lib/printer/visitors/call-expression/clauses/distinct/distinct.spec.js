import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: distinct', (t) => {
    t.transform('distinct');
    t.end();
});

test('happy-sql: printer: clause: distinct: distinct-multi', (t) => {
    t.transform('distinct-multi');
    t.end();
});
