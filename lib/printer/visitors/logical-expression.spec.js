import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: logical-expression: nested or on the left', (t) => {
    t.transform('logical-expression');
    t.end();
});
