import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: on-delete', (t) => {
    t.transform('on-delete');
    t.end();
});
