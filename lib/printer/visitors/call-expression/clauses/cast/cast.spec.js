import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: cast', (t) => {
    t.transform('cast');
    t.end();
});