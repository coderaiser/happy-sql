import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: unionAll', (t) => {
    t.transform('union-all');
    t.end();
});
