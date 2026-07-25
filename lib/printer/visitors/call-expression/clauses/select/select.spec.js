import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: select-fix', (t) => {
    t.noTransform('select-fix');
    t.end();
});
