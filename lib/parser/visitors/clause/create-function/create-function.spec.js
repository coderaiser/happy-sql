import {tryCatch} from 'try-catch';
import {createTest} from '#parser/test';
import {convertSqlToJs} from '#happy-sql';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: create-function', (t) => {
    t.transform('create-function');
    t.end();
});

test('happy-sql: parser: clause: create-function: create-function-or-replace', (t) => {
    t.transform('create-function-or-replace');
    t.end();
});

test('happy-sql: parser: clause: create-function: create-function-return-new', (t) => {
    t.transform('create-function-return-new');
    t.end();
});

test('happy-sql: parser: clause: create-function: create-function-return-null', (t) => {
    t.transform('create-function-return-null');
    t.end();
});

test('happy-sql: parser: clause: create-function: create-function-several', (t) => {
    t.transform('create-function-several');
    t.end();
});

test('happy-sql: parser: clause: create-function: create-function-no-return', (t) => {
    t.transform('create-function-no-return');
    t.end();
});

test('happy-sql: parser: clause: create-function: params', (t) => {
    const [error] = tryCatch(convertSqlToJs, 'CREATE FUNCTION fn(a int) RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN OLD; END $$');
    
    t.equal(error.message, 'CREATE FUNCTION with parameters not supported yet');
    t.end();
});

test('happy-sql: parser: clause: create-function: not a block', (t) => {
    const [error] = tryCatch(convertSqlToJs, 'CREATE FUNCTION fn() RETURNS trigger LANGUAGE plpgsql AS $$ SELECT 1 $$');
    
    t.equal(error.message, 'CREATE FUNCTION body without BEGIN ... END not supported yet');
    t.end();
});
