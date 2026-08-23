import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: pragma-table-info', (t) => {
    t.transform('pragma-table-info');
    t.end();
});
