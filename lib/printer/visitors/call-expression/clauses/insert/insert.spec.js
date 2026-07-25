import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: insert-fix', (t) => {
    t.noTransform('insert-fix');
    t.end();
});
