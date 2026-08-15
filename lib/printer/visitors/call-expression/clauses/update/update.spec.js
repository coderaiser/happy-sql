import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: update-fix', (t) => {
    t.transform('update');
    t.end();
});
