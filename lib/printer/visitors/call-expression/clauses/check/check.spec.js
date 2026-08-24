import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: check', (t) => {
    t.transform('check');
    t.end();
});
