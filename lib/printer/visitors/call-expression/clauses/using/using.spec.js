import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: using-multi', (t) => {
    t.transform('using-multi');
    t.end();
});
