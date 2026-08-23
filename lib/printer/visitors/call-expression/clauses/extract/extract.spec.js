import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: extract', (t) => {
    t.transform('extract');
    t.end();
});
