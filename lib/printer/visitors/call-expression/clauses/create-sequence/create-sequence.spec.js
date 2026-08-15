import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-sequence', (t) => {
    t.transform('create-sequence');
    t.end();
});
