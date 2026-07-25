import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: paragraph', (t) => {
    t.transform('paragraph');
    t.end();
});
