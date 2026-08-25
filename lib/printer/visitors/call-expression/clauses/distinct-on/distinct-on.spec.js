import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: distinct-on', (t) => {
    t.transform('distinct-on');
    t.end();
});
