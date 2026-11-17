import {tryCatch} from 'try-catch';
import {createTest} from '#parser/test';
import {convertSqlToJs} from '#happy-sql';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-trigger', (t) => {
    t.transform('create-trigger');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-if-not-exists', (t) => {
    t.transform('create-trigger-if-not-exists');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-before-insert', (t) => {
    t.transform('create-trigger-before-insert');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-instead-of', (t) => {
    t.transform('create-trigger-instead-of');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-no-time', (t) => {
    t.transform('create-trigger-no-time');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-update-of', (t) => {
    t.transform('create-trigger-update-of');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-when', (t) => {
    t.transform('create-trigger-when');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-execute', (t) => {
    t.transform('create-trigger-execute');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-execute-args', (t) => {
    t.transform('create-trigger-execute-args');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: several events', (t) => {
    const [error] = tryCatch(convertSqlToJs, 'CREATE TRIGGER t AFTER INSERT OR DELETE ON foo EXECUTE FUNCTION fn()');
    
    t.equal(error.message, 'CREATE TRIGGER with several events not supported yet');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: create-trigger-or-replace', (t) => {
    t.transform('create-trigger-or-replace');
    t.end();
});

test('happy-sql: parser: clause: create-trigger: when: create-trigger-when-paren', (t) => {
    t.transform('create-trigger-when-paren');
    t.end();
});
