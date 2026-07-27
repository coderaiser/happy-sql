import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: count', (t) => {
    t.noTransform('count');
    t.end();
});
