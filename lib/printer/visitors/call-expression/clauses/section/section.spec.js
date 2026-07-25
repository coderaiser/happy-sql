import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: section-fix', (t) => {
    t.noTransform('section-fix');
    t.end();
});
