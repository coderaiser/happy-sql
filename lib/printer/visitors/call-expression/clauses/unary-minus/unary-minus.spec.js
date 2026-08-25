import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: unary-minus', (t) => {
    t.transform('unary-minus');
    t.end();
});
