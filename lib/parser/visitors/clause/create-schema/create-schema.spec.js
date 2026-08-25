import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-schema', (t) => {
    t.transform('create-schema');
    t.end();
});
