import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: is-distinct-from', (t) => {
    t.transform('is-distinct-from');
    t.end();
});
