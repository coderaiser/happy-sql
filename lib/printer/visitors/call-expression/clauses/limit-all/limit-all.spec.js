import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: limitAll', (t) => {
    t.transform('limitAll');
    t.end();
});
