import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: partition-by', (t) => {
    t.transform('partition-by');
    t.end();
});
