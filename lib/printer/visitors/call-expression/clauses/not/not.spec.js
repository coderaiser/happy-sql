import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not', (t) => {
    t.transform('not');
    t.end();
});
