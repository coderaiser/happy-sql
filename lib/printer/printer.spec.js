import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-sql: printer: ol', (t) => {
    t.transform('ol');
    t.end();
});

test('happy-sql: printer: task-checked', (t) => {
    t.transform('task-checked');
    t.end();
});

test('happy-sql: printer: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});

test('happy-sql: printer: bold', (t) => {
    t.noTransform('bold');
    t.end();
});

test('happy-sql: printer: italic', (t) => {
    t.noTransform('italic');
    t.end();
});

test('happy-sql: printer: strikethrough', (t) => {
    t.noTransform('strikethrough');
    t.end();
});

test('happy-sql: printer: inline-code', (t) => {
    t.noTransform('inline-code');
    t.end();
});

test('happy-sql: printer: hr', (t) => {
    t.noTransform('hr');
    t.end();
});

test('happy-sql: printer: hard-break', (t) => {
    t.noTransform('hard-break');
    t.end();
});

test('happy-sql: printer: yaml', (t) => {
    t.noTransform('yaml');
    t.end();
});

test('happy-sql: printer: footnote', (t) => {
    t.transform('footnote');
    t.end();
});
