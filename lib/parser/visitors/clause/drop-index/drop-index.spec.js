import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: drop-index', (t) => {
    t.transform('drop-index');
    t.end();
});

test('happy-sql: parser: clause: drop-index-multi', (t) => {
    t.transform('drop-index-multi');
    t.end();
});
