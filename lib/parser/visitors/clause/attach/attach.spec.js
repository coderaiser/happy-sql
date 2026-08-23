import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: attach', (t) => {
    t.transform('attach');
    t.end();
});
