import {tryCatch} from 'try-catch';
import {createTest} from '#parser/test';
import {parseSql} from '#parser';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: parser: section-multi', (t) => {
    t.transform('section-multi');
    t.end();
});

test('happy-sql: parser: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('happy-sql: parser: with-named', (t) => {
    t.transform('with-named');
    t.end();
});

test('happy-sql: parser: with-named-insert', (t) => {
    t.transform('with-named-insert');
    t.end();
});

test('happy-sql: parser: parseSql', (t) => {
    const [error] = tryCatch(parseSql, 'hello world');
    
    t.match(error.message, `Syntax Error: Unexpected "hello"`);
    t.end();
});

test('happy-sql: parser: parseSql: unsupported statement', (t) => {
    const [error] = tryCatch(parseSql, 'CREATE VIEW v AS SELECT 1');
    
    t.match(error.message, 'create_view_stmt not supported yet');
    t.end();
});
