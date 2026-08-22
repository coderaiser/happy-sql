import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: sum', (t) => {
    t.transform('sum');
    t.end();
});
