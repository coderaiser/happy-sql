import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-extension', (t) => {
    t.transform('create-extension');
    t.end();
});
