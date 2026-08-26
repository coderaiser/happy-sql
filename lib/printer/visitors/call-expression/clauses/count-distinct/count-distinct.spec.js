import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: count-distinct', (t) => {
    t.transform('count-distinct');
    t.end();
});
