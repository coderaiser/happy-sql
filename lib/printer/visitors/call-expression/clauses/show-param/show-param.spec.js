import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: show-param', (t) => {
    t.transform('show-param');
    t.end();
});
