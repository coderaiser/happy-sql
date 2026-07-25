import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: on-conflict', (t) => {
    t.noTransform('on-conflict-fix');
    t.end();
});
