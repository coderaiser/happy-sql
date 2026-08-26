import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: forUpdate', (t) => {
    t.transform('forUpdate');
    t.end();
});
