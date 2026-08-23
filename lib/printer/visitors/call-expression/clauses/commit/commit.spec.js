import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: commit', (t) => {
    t.transform('commit');
    t.end();
});
