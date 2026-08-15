import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: withNamed-fix', (t) => {
    t.transform('withNamed');
    t.end();
});
