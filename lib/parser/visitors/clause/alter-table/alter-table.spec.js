import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: alter-table-add-column', (t) => {
    t.transform('alter-table-add-column');
    t.end();
});

test('happy-sql: parser: clause: alter-table-drop-column', (t) => {
    t.transform('alter-table-drop-column');
    t.end();
});

test('happy-sql: parser: clause: alter-table-rename-column', (t) => {
    t.transform('alter-table-rename-column');
    t.end();
});

test('happy-sql: parser: clause: alter-table-alter-column-type', (t) => {
    t.transform('alter-table-alter-column-type');
    t.end();
});
