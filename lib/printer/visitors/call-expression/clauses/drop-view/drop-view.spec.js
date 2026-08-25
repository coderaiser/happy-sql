import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: drop-view', (t) => {
    t.transform('drop-view');
    t.end();
});
