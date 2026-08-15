import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-sequence', (t) => {
    t.transform('create-sequence');
    t.end();
});
