import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: set-param', (t) => {
    t.transform('set-param');
    t.end();
});

test('happy-sql: parser: clause: show-param', (t) => {
    t.transform('show-param');
    t.end();
});
