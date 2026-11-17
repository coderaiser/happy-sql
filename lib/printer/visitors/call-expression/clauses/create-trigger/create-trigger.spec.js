import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-trigger', (t) => {
    t.transform('create-trigger');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-if-not-exists', (t) => {
    t.transform('create-trigger-if-not-exists');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-before-insert', (t) => {
    t.transform('create-trigger-before-insert');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-instead-of', (t) => {
    t.transform('create-trigger-instead-of');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-update-of', (t) => {
    t.transform('create-trigger-update-of');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-when', (t) => {
    t.transform('create-trigger-when');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-execute', (t) => {
    t.transform('create-trigger-execute');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-execute-args', (t) => {
    t.transform('create-trigger-execute-args');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-update-and', (t) => {
    t.transform('create-trigger-update-and');
    t.end();
});

test('happy-sql: printer: clause: create-trigger: create-trigger-or-replace', (t) => {
    t.transform('create-trigger-or-replace');
    t.end();
});
