import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: vacuum', (t) => {
    t.transform('vacuum');
    t.end();
});

test('happy-sql: parser: clause: vacuum-into', (t) => {
    t.transform('vacuum-into');
    t.end();
});
