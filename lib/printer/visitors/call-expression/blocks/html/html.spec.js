import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: html', (t) => {
    t.transform('html');
    t.end();
});

test('happy-sql: printer: html-inline', (t) => {
    t.transform('html-inline');
    t.end();
});

test('happy-sql: printer: html-multiline', (t) => {
    t.transform('html-multiline');
    t.end();
});
