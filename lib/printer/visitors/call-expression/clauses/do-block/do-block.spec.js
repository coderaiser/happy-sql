import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: do-block', (t) => {
    t.transform('do-block');
    t.end();
});
