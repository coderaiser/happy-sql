import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: delete with where', (t) => {
    t.transform('delete');
    t.end();
});
