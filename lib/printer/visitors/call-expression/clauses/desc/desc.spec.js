import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: desc', (t) => {
    t.transform('desc');
    t.end();
});
