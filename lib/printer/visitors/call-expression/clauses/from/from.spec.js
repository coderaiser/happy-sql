import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: from', (t) => {
    t.transform('from');
    t.end();
});
