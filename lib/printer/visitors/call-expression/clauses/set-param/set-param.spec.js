import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: set-param', (t) => {
    t.transform('set-param');
    t.end();
});

test('happy-sql: printer: clause: set-param-multi', (t) => {
    t.transform('set-param-multi');
    t.end();
});
