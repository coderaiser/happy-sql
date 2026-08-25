import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: detach', (t) => {
    t.transform('detach');
    t.end();
});
