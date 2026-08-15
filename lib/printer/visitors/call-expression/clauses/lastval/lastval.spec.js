import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: lastval', (t) => {
    t.transform('lastval');
    t.end();
});
