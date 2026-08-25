import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-schema', (t) => {
    t.transform('create-schema');
    t.end();
});
