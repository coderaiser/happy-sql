import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: from-fix', (t) => {
    t.noTransform('from-fix');
    t.end();
});
