import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-view', (t) => {
    t.transform('create-view');
    t.end();
});
