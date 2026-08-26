import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: fetchFirst', (t) => {
    t.transform('fetchFirst');
    t.end();
});
