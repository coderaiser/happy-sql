import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: section-fix', (t) => {
    t.transform('section');
    t.end();
});

test('happy-sql: printer: clause: section-multi-fix', (t) => {
    t.transform('section-multi');
    t.end();
});
