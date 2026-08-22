import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: exists', (t) => {
    t.transform('exists');
    t.end();
});
