import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: unique', (t) => {
    t.transform('unique');
    t.end();
});
