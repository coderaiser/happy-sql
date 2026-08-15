import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: nextval', (t) => {
    t.transform('nextval');
    t.end();
});
