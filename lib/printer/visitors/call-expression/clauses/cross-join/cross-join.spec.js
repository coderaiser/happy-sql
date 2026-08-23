import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: cross-join', (t) => {
    t.transform('cross-join');
    t.end();
});
