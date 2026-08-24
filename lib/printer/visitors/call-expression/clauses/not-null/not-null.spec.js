import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-null', (t) => {
    t.transform('not-null');
    t.end();
});
