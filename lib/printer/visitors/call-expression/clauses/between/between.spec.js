import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: between', (t) => {
    t.transform('between');
    t.end();
});
