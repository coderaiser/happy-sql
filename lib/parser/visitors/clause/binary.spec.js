import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

for (const name of [
    'json-arrow',
    'json-double-arrow',
    'json-path',
    'json-path-text',
    'json-has-key',
    'json-has-any-key',
    'json-has-all-keys',
    'json-contains',
    'json-contained-by',
])
    test(`happy-sql: parser: binary: ${name}`, (t) => {
        t.transform(name);
        t.end();
    });
