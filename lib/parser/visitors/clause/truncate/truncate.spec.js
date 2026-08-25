import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: truncate', (t) => {
    t.transform('truncate');
    t.end();
});

test('happy-sql: parser: clause: truncate-multi', (t) => {
    t.transform('truncate-multi');
    t.end();
});
