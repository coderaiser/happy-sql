import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-function: create-function', (t) => {
    t.transform('create-function');
    t.end();
});

test('happy-sql: printer: clause: create-function: create-function-or-replace', (t) => {
    t.transform('create-function-or-replace');
    t.end();
});

test('happy-sql: printer: clause: create-function: create-function-return-new', (t) => {
    t.transform('create-function-return-new');
    t.end();
});

test('happy-sql: printer: clause: create-function: create-function-return-null', (t) => {
    t.transform('create-function-return-null');
    t.end();
});

test('happy-sql: printer: clause: create-function: create-function-several', (t) => {
    t.transform('create-function-several');
    t.end();
});

test('happy-sql: printer: clause: create-function: create-function-no-return', (t) => {
    t.transform('create-function-no-return');
    t.end();
});
