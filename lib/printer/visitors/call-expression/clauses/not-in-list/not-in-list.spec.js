import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-in-list', (t) => {
    t.transform('not-in-list');
    t.end();
});
