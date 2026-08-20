import {parseSql, printSql} from 'happy-sql';
import {test} from 'supertape';

test('happy-sql: roundtrip: select star', (t) => {
    const source = `SELECT *
FROM users`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select columns', (t) => {
    const source = `SELECT id, name
FROM users`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select alias', (t) => {
    const source = `SELECT 'Prefer let over const' AS message, start_line AS line
FROM VariableDeclaration`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where param', (t) => {
    const source = `SELECT *
FROM users
WHERE id = :id`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where and', (t) => {
    const source = `SELECT *
FROM users
WHERE file = :file
AND kind = 'const'`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where or', (t) => {
    const source = `SELECT *
FROM users
WHERE x = ':x' OR y = ':y'`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = `SELECT *
FROM users
WHERE x = :x
OR y = :y\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert single', (t) => {
    const source = `INSERT INTO CallExpression (parent_id) VALUES (:parent_id)`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert multi', (t) => {
    const source = `INSERT INTO CallExpression (parent_id, parent_type) VALUES (:parent_id, :parent_type)`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict nothing', (t) => {
    const source = `INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
ON CONFLICT DO NOTHING`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict target nothing', (t) => {
    const source = `INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
ON CONFLICT (parent_id) DO NOTHING`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict update', (t) => {
    const source = `INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
ON CONFLICT (parent_id) DO UPDATE SET parent_type = ':parent_type'`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = `INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
ON CONFLICT (parent_id) DO UPDATE SET parent_type = :parent_type\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update', (t) => {
    const source = `UPDATE CallExpression
SET parent_type = :parent_type
WHERE parent_id = :parent_id`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: delete', (t) => {
    const source = `DELETE FROM CallExpression
WHERE parent_id = :parent_id`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: section', (t) => {
    const source = `-- @select
SELECT *
FROM users`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: section multi', (t) => {
    const source = `-- @select
SELECT *
FROM users;
-- @report
SELECT 'test' AS message\n`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = `-- @select
SELECT *
FROM users

-- @report
SELECT 'test' AS message\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table autoincrement', (t) => {
    const source = `CREATE TABLE test (
id SERIAL PRIMARY KEY)`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table with multiple columns', (t) => {
    const source = `CREATE TABLE test (
id INTEGER,
name TEXT)`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table serial', (t) => {
    const source = `CREATE TABLE test (
id SERIAL)`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: last_insert_rowid', (t) => {
    const source = 'SELECT last_insert_rowid()';
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: lastval', (t) => {
    const source = 'SELECT lastval()';
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});
