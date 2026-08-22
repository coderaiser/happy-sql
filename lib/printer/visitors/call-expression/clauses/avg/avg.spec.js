import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: avg', (t) => {
    t.transform('avg');
    t.end();
});
