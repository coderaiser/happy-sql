import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: any', (t) => {
    t.transform('any');
    t.end();
});
