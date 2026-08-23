import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-between', (t) => {
    t.transform('not-between');
    t.end();
});
