import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: update-from', (t) => {
    t.transform('update-from');
    t.end();
});
