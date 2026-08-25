import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: filter', (t) => {
    t.transform('filter');
    t.end();
});
