import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-indexed', (t) => {
    t.transform('not-indexed');
    t.end();
});
