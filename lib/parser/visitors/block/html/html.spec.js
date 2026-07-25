import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: html', (t) => {
    t.transform('html');
    t.end();
});

test('happy-sql: parser: html-multiline', (t) => {
    t.transform('html-multiline');
    t.end();
});
