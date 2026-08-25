import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: vacuum', (t) => {
    t.transform('vacuum');
    t.end();
});

test('happy-sql: printer: clause: vacuum-into', (t) => {
    t.transform('vacuum-into');
    t.end();
});
