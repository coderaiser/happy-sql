import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: max', (t) => {
    t.transform('max');
    t.end();
});
