import {test} from 'supertape';
import {montag} from 'montag';
import {
    convertJsToSql,
    convertSqlToJs,
    parseSql,
    printSql,
} from 'happy-sql';

test('happy-sql: roundtrip: select star', (t) => {
    const source = montag`
        SELECT *
        FROM users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select columns', (t) => {
    const source = montag`
        SELECT id, name
        FROM users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select alias', (t) => {
    const source = montag`
        SELECT 'Prefer let over const' AS message, start_line AS line
        FROM VariableDeclaration
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where param', (t) => {
    const source = montag`
        SELECT *
        FROM users
        WHERE id = :id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where and', (t) => {
    const source = montag`
        SELECT *
        FROM users
        WHERE file = :file
        AND kind = 'const'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where or', (t) => {
    const source = montag`
        SELECT *
        FROM users
        WHERE x = ':x' OR y = ':y'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = montag`
        SELECT *
        FROM users
        WHERE x = :x
        OR y = :y
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert single', (t) => {
    const source = montag`
        INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert multi', (t) => {
    const source = montag`
        INSERT INTO CallExpression (parent_id, parent_type) VALUES (:parent_id, :parent_type)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict nothing', (t) => {
    const source = montag`
        INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
        ON CONFLICT DO NOTHING
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict target nothing', (t) => {
    const source = montag`
        INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
        ON CONFLICT (parent_id) DO NOTHING
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict update', (t) => {
    const source = montag`
        INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
        ON CONFLICT (parent_id) DO UPDATE SET parent_type = ':parent_type'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = montag`
        INSERT INTO CallExpression (parent_id) VALUES (:parent_id)
        ON CONFLICT (parent_id) DO UPDATE SET parent_type = :parent_type
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update', (t) => {
    const source = montag`
        UPDATE CallExpression
        SET parent_type = :parent_type
        WHERE parent_id = :parent_id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: delete', (t) => {
    const source = montag`
        DELETE FROM CallExpression
        WHERE parent_id = :parent_id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: section', (t) => {
    const source = montag`
        -- @select
        SELECT *
        FROM users;
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: section multi', (t) => {
    const source = montag`
        -- @select
        SELECT *
        FROM users;
        -- @report
        SELECT 'test' AS message
    
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    const expected = montag`
        -- @select
        SELECT *
        FROM users;
        
        -- @report
        SELECT 'test' AS message;
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table autoincrement', (t) => {
    const source = montag`
        CREATE TABLE test (
        id SERIAL PRIMARY KEY)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table with multiple columns', (t) => {
    const source = montag`
        CREATE TABLE test (
        id INTEGER,
        name TEXT)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table serial', (t) => {
    const source = montag`
        CREATE TABLE test (
        id SERIAL)
    `;
    
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

test('happy-sql: roundtrip: withNamed select', (t) => {
    const source = montag`
        WITH
            recent AS (
                SELECT id
                FROM users
                WHERE kind = 'const'
            )
        SELECT id
        FROM recent
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: withRecursive', (t) => {
    const source = montag`
        WITH RECURSIVE
            numbers(value) AS (
                SELECT 1
                UNION ALL
                SELECT value + 1
                FROM numbers
                WHERE value < 10
            )
        SELECT value
        FROM numbers
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: unionAll', (t) => {
    const source = montag`
        SELECT 1
        UNION ALL
        SELECT 2
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: groupBy having', (t) => {
    const source = montag`
        SELECT kind, COUNT(*)
        FROM VariableDeclaration
        WHERE kind = 'const'
        GROUP BY kind
        HAVING COUNT(*) > 1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: groupBy sum having', (t) => {
    const source = montag`
        SELECT dept, SUM(salary)
        FROM emp
        GROUP BY dept
        HAVING SUM(salary) > 1000
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: orderBy', (t) => {
    const source = montag`
        SELECT id
        FROM users
        ORDER BY name
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: orderBy desc', (t) => {
    const source = montag`
        SELECT id
        FROM users
        ORDER BY name DESC
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: groupBy orderBy', (t) => {
    const source = montag`
        SELECT dept, COUNT(*)
        FROM emp
        GROUP BY dept
        ORDER BY dept
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: limit', (t) => {
    const source = montag`
        SELECT id
        FROM users
        LIMIT 10
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: limit offset', (t) => {
    const source = montag`
        SELECT id
        FROM users
        LIMIT 10
        OFFSET 5
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: distinct', (t) => {
    const source = montag`
        SELECT DISTINCT name
        FROM users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where not in', (t) => {
    const source = montag`
        SELECT *
        FROM users
        WHERE id NOT IN (1, 2, 3)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where between', (t) => {
    const source = montag`
        SELECT *
        FROM users
        WHERE age BETWEEN 18 AND 65
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: full groupBy query', (t) => {
    const source = montag`
        SELECT dept, SUM(salary)
        FROM emp
        WHERE dept != 'intern'
        GROUP BY dept
        HAVING SUM(salary) > 1000
        ORDER BY dept
        LIMIT 10
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: generate_series', (t) => {
    const sql = 'SELECT *\nFROM generate_series(1, 10, 2)';
    const result = convertJsToSql(convertSqlToJs(sql));
    const expected = `${sql}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: left join', (t) => {
    const source = montag`
        SELECT *
        FROM users
        LEFT JOIN orders ON users.id = orders.user_id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: inner join', (t) => {
    const source = montag`
        SELECT *
        FROM users
        INNER JOIN orders ON users.id = orders.user_id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: coalesce', (t) => {
    const source = montag`
        SELECT COALESCE(name, id)
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: returning star', (t) => {
    const source = montag`
        INSERT INTO t (name) VALUES ('test')
        RETURNING *
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: subquery in from', (t) => {
    const source = montag`
        SELECT *
        FROM (SELECT id
        FROM t) AS sub
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where in subquery', (t) => {
    const source = montag`
        SELECT id
        FROM t
        WHERE id IN (SELECT user_id
        FROM orders)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where exists', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE EXISTS (SELECT 1
        FROM u
        WHERE u.id = t.id)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: cast', (t) => {
    const source = montag`
        SELECT CAST(id AS TEXT)
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});
