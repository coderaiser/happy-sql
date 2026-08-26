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

test('happy-sql: parser: clause: alter-table-rename-table', (t) => {
    t.transform('alter-table-rename-table');
    t.end();
});

test('happy-sql: parser: clause: alter-table-add-constraint', (t) => {
    t.transform('alter-table-add-constraint');
    t.end();
});

test('happy-sql: parser: clause: alter-table-add-unique', (t) => {
    t.transform('alter-table-add-unique');
    t.end();
});

test('happy-sql: parser: clause: alter-table-enable-rls', (t) => {
    t.transform('alter-table-enable-rls');
    t.end();
});

test('happy-sql: parser: clause: alter-table-disable-rls', (t) => {
    t.transform('alter-table-disable-rls');
    t.end();
});
