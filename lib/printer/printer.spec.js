import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: select-fix', (t) => {
    t.noTransform('select-fix');
    t.end();
});
// More printer specs are in clause subdirectories
