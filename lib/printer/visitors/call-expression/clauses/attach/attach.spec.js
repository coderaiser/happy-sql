import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: attach', (t) => {
    t.transform('attach');
    t.end();
});
