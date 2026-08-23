import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: union', (t) => {
    t.transform('union');
    t.end();
});
