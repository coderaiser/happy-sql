import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: defaultNextval', (t) => {
    t.transform('defaultNextval');
    t.end();
});
