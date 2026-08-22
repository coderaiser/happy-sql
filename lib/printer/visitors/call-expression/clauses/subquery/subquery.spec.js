import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: subquery', (t) => {
    t.transform('subquery');
    t.end();
});
