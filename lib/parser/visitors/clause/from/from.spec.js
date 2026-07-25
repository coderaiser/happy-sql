import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: from', (t) => {
    t.transform('from');
    t.end();
});
