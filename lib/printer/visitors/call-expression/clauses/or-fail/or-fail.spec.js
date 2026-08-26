import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: or-fail', (t) => {
    t.transform('or-fail');
    t.end();
});
