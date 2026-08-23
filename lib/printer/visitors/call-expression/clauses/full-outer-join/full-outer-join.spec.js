import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: full-outer-join', (t) => {
    t.transform('full-outer-join');
    t.end();
});
