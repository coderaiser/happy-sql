import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: tuple', (t) => {
    t.transform('tuple');
    t.end();
});

test('happy-sql: printer: clause: tuple: tuple-in-subquery', (t) => {
    t.transform('tuple-in-subquery');
    t.end();
});
