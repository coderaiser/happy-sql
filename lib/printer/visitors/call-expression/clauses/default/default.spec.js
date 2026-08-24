import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: default', (t) => {
    t.transform('default');
    t.end();
});
