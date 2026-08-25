import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: do-block', (t) => {
    t.transform('do-block');
    t.end();
});
