import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: union-all', (t) => {
    t.transform('union-all');
    t.end();
});
