import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: indexed-by', (t) => {
    t.transform('indexed-by');
    t.end();
});
