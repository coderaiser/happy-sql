import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: yaml', (t) => {
    t.transform('yaml');
    t.end();
});

test('happy-sql: parser: yaml-multiline', (t) => {
    t.transform('yaml-multiline');
    t.end();
});
