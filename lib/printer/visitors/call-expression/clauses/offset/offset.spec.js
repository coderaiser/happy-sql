import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: offset', (t) => {
    t.transform('offset');
    t.end();
});
