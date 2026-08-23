import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-like', (t) => {
    t.transform('not-like');
    t.end();
});
