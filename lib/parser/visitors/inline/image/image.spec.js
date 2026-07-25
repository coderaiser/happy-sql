import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: image', (t) => {
    t.transform('image');
    t.end();
});

test('happy-sql: parser: image-title', (t) => {
    t.transform('image-title');
    t.end();
});

test('happy-sql: parser: image-no-alt', (t) => {
    t.transform('image-no-alt');
    t.end();
});
