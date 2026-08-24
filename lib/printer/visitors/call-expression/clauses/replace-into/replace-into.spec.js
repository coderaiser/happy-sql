import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: replace-into', (t) => {
    t.transform('replace-into');
    t.end();
});

test('happy-sql: printer: clause: replaceInto: replace-into-returning', (t) => {
    t.transform('replace-into-returning');
    t.end();
});
