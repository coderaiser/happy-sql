import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: strong', (t) => {
    t.transform('strong');
    t.end();
});
