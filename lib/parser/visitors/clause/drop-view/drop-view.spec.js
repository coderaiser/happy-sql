import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: drop-view', (t) => {
    t.transform('drop-view');
    t.end();
});
