import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: where', (t) => {
    t.noTransform('where-fix');
    t.end();
});
