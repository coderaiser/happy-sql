import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: code', (t) => {
    t.noTransform('code');
    t.end();
});
