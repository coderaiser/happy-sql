import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: pragma-table-info', (t) => {
    t.transform('pragma-table-info');
    t.end();
});
