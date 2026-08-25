import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-virtual-table', (t) => {
    t.transform('create-virtual-table');
    t.end();
});
