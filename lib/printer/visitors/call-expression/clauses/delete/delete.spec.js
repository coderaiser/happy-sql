import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: delete-fix', (t) => {
    t.noTransform('delete-fix');
    t.end();
});
