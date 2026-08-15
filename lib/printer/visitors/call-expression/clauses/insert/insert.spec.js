import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: insert', (t) => {
    t.transform('insert');
    t.end();
});
