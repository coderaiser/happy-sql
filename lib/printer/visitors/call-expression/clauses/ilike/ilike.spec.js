import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: ilike', (t) => {
    t.transform('ilike');
    t.end();
});
