import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: access-method', (t) => {
    t.transform('access-method');
    t.end();
});
