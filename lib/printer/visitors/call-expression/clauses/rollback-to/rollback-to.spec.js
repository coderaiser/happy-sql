import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: rollback-to', (t) => {
    t.transform('rollback-to');
    t.end();
});
