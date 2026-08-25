import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: named-window', (t) => {
    t.transform('named-window');
    t.end();
});
