import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: pg-cast', (t) => {
    t.transform('pg-cast');
    t.end();
});
