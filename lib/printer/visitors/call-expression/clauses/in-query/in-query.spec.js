import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: in-query', (t) => {
    t.transform('in-query');
    t.end();
});
