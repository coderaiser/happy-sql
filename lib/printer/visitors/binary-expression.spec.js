import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: binary-expression: fallback op', (t) => {
    t.transform('binary-expression');
    t.end();
});
