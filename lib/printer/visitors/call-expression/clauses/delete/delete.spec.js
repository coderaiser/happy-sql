import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: delete', (t) => {
    t.transform('delete');
    t.end();
});
