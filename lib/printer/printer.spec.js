import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: printer: statements', (t) => {
    t.transform('statements');
    t.end();
});

test('happy-sql: printer: statements: statements-section', (t) => {
    t.transform('statements-section');
    t.end();
});

test('happy-sql: printer: statement', (t) => {
    t.transform('statement');
    t.end();
});
// More printer specs are in clause subdirectories
