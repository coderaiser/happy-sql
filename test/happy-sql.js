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
    const source = montag`
        SELECT lastval()
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: withNamed select', (t) => {
    const source = montag`
        WITH recent AS (SELECT id
        FROM users
        WHERE kind = 'const')
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
        FROM t) sub
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

test('happy-sql: roundtrip: case when', (t) => {
    const source = montag`
        SELECT CASE WHEN kind = 'const' THEN 1 WHEN kind = 'let' THEN 2 ELSE 0 END
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: full outer join', (t) => {
    const source = montag`
        SELECT *
        FROM a
        FULL OUTER JOIN b ON a.id = b.id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: natural join', (t) => {
    const source = montag`
        SELECT *
        FROM a
        NATURAL JOIN b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where not like', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE name NOT LIKE '%x%'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where ilike', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE name ILIKE '%foo%'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where similar to', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE name SIMILAR TO '%foo%'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where is distinct from', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE a IS DISTINCT FROM b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where not between', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE x NOT BETWEEN 1 AND 10
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update from', (t) => {
    const source = montag`
        UPDATE t
        SET x = 1
        FROM u
        WHERE t.id = u.id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update returning', (t) => {
    const source = montag`
        UPDATE t
        SET x = 1
        WHERE id = 1
        RETURNING id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: drop table multi', (t) => {
    const source = montag`
        DROP TABLE a, b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: drop table if exists', (t) => {
    const source = montag`
        DROP TABLE IF EXISTS users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select null', (t) => {
    const source = montag`
        SELECT NULL
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select bool', (t) => {
    const source = montag`
        SELECT TRUE, FALSE
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select table star', (t) => {
    const source = montag`
        SELECT u.*
        FROM users AS u
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: extract', (t) => {
    const source = montag`
        SELECT EXTRACT(YEAR FROM created_at)
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: jsonb arrow', (t) => {
    const source = montag`
        SELECT data -> 'key'
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: jsonb double arrow', (t) => {
    const source = montag`
        SELECT data ->> 'key'
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: string concat', (t) => {
    const source = montag`
        SELECT a || b
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: alter table add column', (t) => {
    const source = montag`
        ALTER TABLE t
        ADD COLUMN y INT
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: alter table drop column', (t) => {
    const source = montag`
        ALTER TABLE t
        DROP COLUMN name
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: alter table rename column', (t) => {
    const source = montag`
        ALTER TABLE t
        RENAME COLUMN old_name TO new_name
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: alter table alter column type', (t) => {
    const source = montag`
        ALTER TABLE t
        ALTER COLUMN x TYPE TEXT
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: begin', (t) => {
    const ast = parseSql('BEGIN');
    const result = printSql(ast);
    
    t.equal(result, 'BEGIN\n');
    t.end();
});

test('happy-sql: roundtrip: commit', (t) => {
    const ast = parseSql('COMMIT');
    const result = printSql(ast);
    
    t.equal(result, 'COMMIT\n');
    t.end();
});

test('happy-sql: roundtrip: rollback', (t) => {
    const ast = parseSql('ROLLBACK');
    const result = printSql(ast);
    
    t.equal(result, 'ROLLBACK\n');
    t.end();
});

test('happy-sql: roundtrip: savepoint', (t) => {
    const ast = parseSql('SAVEPOINT sp1');
    const result = printSql(ast);
    
    t.equal(result, 'SAVEPOINT sp1\n');
    t.end();
});

test('happy-sql: roundtrip: rollback to savepoint', (t) => {
    const ast = parseSql('ROLLBACK TO SAVEPOINT sp1');
    const result = printSql(ast);
    
    t.equal(result, 'ROLLBACK TO SAVEPOINT sp1\n');
    t.end();
});

test('happy-sql: roundtrip: drop index', (t) => {
    const ast = parseSql('DROP INDEX idx');
    const result = printSql(ast);
    
    t.equal(result, 'DROP INDEX idx\n');
    t.end();
});

test('happy-sql: roundtrip: pragma table_info', (t) => {
    const ast = parseSql('PRAGMA table_info(users)');
    const result = printSql(ast);
    
    t.equal(result, 'PRAGMA table_info(users)\n');
    t.end();
});

test('happy-sql: roundtrip: attach database', (t) => {
    const source = `ATTACH DATABASE 'file.db' AS other`;
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, `${source}\n`);
    t.end();
});

const jsonRoundTripCases = [
    ['arrow', `SELECT data -> 'name'\nFROM users`],
    ['double-arrow', `SELECT data ->> 'name'\nFROM users`],
    ['has-key', `SELECT *\nFROM users\nWHERE data ? 'email'`],
    ['contains', `SELECT *\nFROM users\nWHERE data @> '{"name":"x"}'`],
    ['has-any-key', `SELECT *\nFROM users\nWHERE data ?| ARRAY['email', 'name']`],
    ['key-exists', `SELECT *\nFROM users\nWHERE data ?? 'email'`],
];

for (const [name, sql] of jsonRoundTripCases)
    test(`happy-sql: round-trip: json operators: ${name}`, (t) => {
        const result = convertJsToSql(convertSqlToJs(sql));
        
        const expected = `${sql}\n`;
        
        t.equal(result, expected);
        t.end();
    });

test('happy-sql: roundtrip: union distinct', (t) => {
    const source = montag`
        SELECT id
        FROM a
        UNION
        SELECT id
        FROM b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: window over', (t) => {
    const source = montag`
        SELECT id, ROW_NUMBER() OVER (PARTITION BY kind ORDER BY id)
        FROM users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where and with nested or parens', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE c = 3 AND (a = 1 OR b = 2)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: concat nested', (t) => {
    const source = montag`
        SELECT first_name || ' ' || last_name
        FROM t
    `;
    
    const result = convertJsToSql(convertSqlToJs(source));
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: filter where', (t) => {
    const result = convertJsToSql(convertSqlToJs(`SELECT COUNT(*) FILTER (WHERE active = TRUE)\nFROM t`));
    const expected = `SELECT COUNT(*) FILTER (WHERE active = TRUE)\nFROM t\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: distinct on', (t) => {
    const result = convertJsToSql(convertSqlToJs(`SELECT DISTINCT ON (kind) id\nFROM t`));
    const expected = `SELECT DISTINCT ON (kind) id\nFROM t\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: truncate', (t) => {
    const result = convertJsToSql(convertSqlToJs('TRUNCATE TABLE t'));
    const expected = 'TRUNCATE TABLE t\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: truncate multi', (t) => {
    const result = convertJsToSql(convertSqlToJs('TRUNCATE TABLE a, b'));
    const expected = 'TRUNCATE TABLE a, b\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: named window', (t) => {
    const result = convertJsToSql(convertSqlToJs(`SELECT ID, SUM(x) OVER w\nFROM t\nWINDOW w AS (ORDER BY id)`));
    const expected = `SELECT ID, SUM(x) OVER w\nFROM t\nWINDOW w AS (ORDER BY id)\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: detach database', (t) => {
    const result = convertJsToSql(convertSqlToJs('DETACH DATABASE other'));
    const expected = 'DETACH DATABASE other\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: values standalone', (t) => {
    const result = convertJsToSql(convertSqlToJs(`VALUES (1, 'a'), (2, 'b')`));
    const expected = `VALUES (1, 'a'), (2, 'b')\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table as', (t) => {
    const source = montag`
        CREATE TABLE t2 AS SELECT *
        FROM t1
    `;
    
    const result = convertJsToSql(convertSqlToJs(source));
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where isnull postfix', (t) => {
    const result = convertJsToSql(convertSqlToJs(`SELECT *\nFROM t\nWHERE id ISNULL`));
    const expected = `SELECT *\nFROM t\nWHERE id IS NULL\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where notnull postfix', (t) => {
    const result = convertJsToSql(convertSqlToJs(`SELECT *\nFROM t\nWHERE id NOTNULL`));
    const expected = `SELECT *\nFROM t\nWHERE id IS NOT NULL\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: jsonb contains with pg cast', (t) => {
    const source = montag`
        SELECT data @> '{}'::jsonb
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: pg cast operator double colon', (t) => {
    const source = montag`
        SELECT id::TEXT
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where any', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE id = ANY(ARRAY[1, 2, 3])
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where all subquery', (t) => {
    const source = montag`
        SELECT *
        FROM t
        WHERE id > ALL(SELECT id
        FROM u)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select array literal', (t) => {
    const source = montag`
        SELECT ARRAY['a', 'b']
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: lateral join', (t) => {
    const source = montag`
        SELECT *
        FROM t, LATERAL (SELECT 1) sub
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: vacuum', (t) => {
    const result = printSql(parseSql('VACUUM'));
    
    t.equal(result, 'VACUUM\n');
    t.end();
});

test('happy-sql: roundtrip: create index', (t) => {
    const source = montag`
        CREATE INDEX idx ON t (name)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert multi-row values', (t) => {
    const source = montag`
        INSERT INTO t (id) VALUES (1), (2), (3)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table not null', (t) => {
    const source = montag`
        CREATE TABLE t (
        id INT NOT NULL)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table default', (t) => {
    const source = montag`
        CREATE TABLE t (
        id INT DEFAULT 0)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table unique', (t) => {
    const source = montag`
        CREATE TABLE t (
        x INT UNIQUE)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table check', (t) => {
    const source = montag`
        CREATE TABLE t (
        x INT CHECK (x > 0))
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table references', (t) => {
    const source = montag`
        CREATE TABLE orders (
        user_id INT REFERENCES users(id))
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table if not exists', (t) => {
    const source = montag`
        CREATE TABLE IF NOT EXISTS t (
        id INT)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: intersect', (t) => {
    const source = montag`
        SELECT id
        FROM a
        INTERSECT
        SELECT id
        FROM b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: except', (t) => {
    const source = montag`
        SELECT id
        FROM a
        EXCEPT
        SELECT id
        FROM b
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: replace into', (t) => {
    const source = montag`
        REPLACE INTO t (id, name) VALUES (1, 'x')
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: with cte', (t) => {
    const source = montag`
        WITH cte AS (SELECT id
        FROM u)
        SELECT *
        FROM cte
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create index if not exists', (t) => {
    const source = montag`
        CREATE INDEX IF NOT EXISTS idx ON t (name)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create index concurrently', (t) => {
    const source = montag`
        CREATE INDEX CONCURRENTLY idx ON t (name)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create index where', (t) => {
    const source = montag`
        CREATE INDEX idx ON t (name)
        WHERE active = TRUE
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: drop index if exists', (t) => {
    const source = montag`
        DROP INDEX IF EXISTS idx
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update or replace', (t) => {
    const source = montag`
        UPDATE OR REPLACE t
        SET x = 1
        WHERE id = 1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update or ignore', (t) => {
    const source = montag`
        UPDATE OR IGNORE t
        SET x = 1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: vacuum into', (t) => {
    const source = montag`
        VACUUM INTO 'backup.db'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: explain', (t) => {
    const source = montag`
        EXPLAIN SELECT *
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: explain analyze', (t) => {
    const source = montag`
        EXPLAIN ANALYZE SELECT *
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: set param', (t) => {
    const source = montag`
        SET search_path TO myschema
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: show param', (t) => {
    const source = montag`
        SHOW search_path
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create view', (t) => {
    const source = montag`
        CREATE VIEW v AS SELECT *
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create materialized view', (t) => {
    const source = montag`
        CREATE MATERIALIZED VIEW mv AS SELECT *
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: drop view', (t) => {
    const source = montag`
        DROP VIEW v
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create extension', (t) => {
    const source = montag`
        CREATE EXTENSION pgcrypto
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create schema', (t) => {
    const source = montag`
        CREATE SCHEMA myschema
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: grant', (t) => {
    const source = montag`
        GRANT SELECT ON t TO user1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: indexed by', (t) => {
    const source = montag`
        SELECT *
        FROM t INDEXED BY idx
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: not indexed', (t) => {
    const source = montag`
        SELECT *
        FROM t NOT INDEXED
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create virtual table', (t) => {
    const source = montag`
        CREATE VIRTUAL TABLE ft USING fts5(content)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: reindex', (t) => {
    const source = montag`
        REINDEX
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: analyze', (t) => {
    const source = montag`
        ANALYZE
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: release savepoint', (t) => {
    const source = montag`
        RELEASE SAVEPOINT sp1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: ANALYZE users', (t) => {
    const source = montag`
        ANALYZE users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: REINDEX users', (t) => {
    const source = montag`
        REINDEX users
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: UNNEST with alias', (t) => {
    const source = montag`
        SELECT *
        FROM UNNEST(ARRAY[1, 2, 3]) AS t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: DO block', (t) => {
    const source = montag`
        DO $$ BEGIN NULL; END $$
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select arithmetic', (t) => {
    const source = montag`
        SELECT a + b * c
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select unary minus', (t) => {
    const source = montag`
        SELECT -a
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select not', (t) => {
    const source = montag`
        SELECT NOT c
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select between', (t) => {
    const source = montag`
        SELECT a BETWEEN 1 AND 5
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select exists column', (t) => {
    const source = 'SELECT EXISTS (SELECT 1)';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select scalar subquery', (t) => {
    const source = `SELECT (SELECT max(x) FROM u) AS m`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'SELECT (SELECT MAX(x)\nFROM u) AS m\n');
    t.end();
});

test('happy-sql: round-trip: select array cast', (t) => {
    const source = montag`
        SELECT a::int[]
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select subscript', (t) => {
    const source = montag`
        SELECT arr[1]
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select qualified table', (t) => {
    const source = montag`
        SELECT a
        FROM s.t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: select quoted identifier', (t) => {
    const source = montag`
        SELECT "weird col"
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: pragma no args', (t) => {
    const source = 'PRAGMA user_version';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: pragma value', (t) => {
    const source = 'PRAGMA foreign_keys = ON';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: pragma qualified', (t) => {
    const source = 'PRAGMA schema.user_version';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: pragma string arg', (t) => {
    const source = `PRAGMA table_info('t')`;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: join using', (t) => {
    const source = montag`
        SELECT *
        FROM t1
        JOIN t2 USING (id)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: insert no columns', (t) => {
    const source = 'INSERT INTO t VALUES (1, 2)';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: insert default values', (t) => {
    const source = 'INSERT INTO t DEFAULT VALUES';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: insert table alias', (t) => {
    const source = 'INSERT INTO t AS x (a) VALUES (1)';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: create table primary key constraint', (t) => {
    const source = montag`
        CREATE TABLE t (
        a INT,
        b INT,
        PRIMARY KEY (a, b))
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'CREATE TABLE t (\na INT,\nb INT,\nPRIMARY KEY (a, b))\n');
    t.end();
});

test('happy-sql: round-trip: create table unique constraint', (t) => {
    const source = montag`
        CREATE TABLE t (
        a INT,
        UNIQUE (a))
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'CREATE TABLE t (\na INT,\nUNIQUE (a))\n');
    t.end();
});

test('happy-sql: round-trip: create table named constraint', (t) => {
    const source = montag`
        CREATE TABLE t (
        a INT,
        CONSTRAINT pk PRIMARY KEY (a))
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'CREATE TABLE t (\na INT,\nCONSTRAINT pk PRIMARY KEY (a))\n');
    t.end();
});

test('happy-sql: round-trip: alter table rename', (t) => {
    const source = montag`
        ALTER TABLE t
        RENAME TO u
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: alter table add constraint', (t) => {
    const source = montag`
        ALTER TABLE t
        ADD CONSTRAINT c UNIQUE (a)
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'ALTER TABLE t\nCONSTRAINT c UNIQUE (a)\n');
    t.end();
});

test('happy-sql: round-trip: alter table enable rls', (t) => {
    const source = montag`
        ALTER TABLE t
        ENABLE ROW LEVEL SECURITY
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: alter table disable rls', (t) => {
    const source = montag`
        ALTER TABLE t
        DISABLE ROW LEVEL SECURITY
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: order by ordinal', (t) => {
    const source = montag`
        SELECT x
        FROM t
        ORDER BY 2
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: order by nulls first', (t) => {
    const source = montag`
        SELECT a
        FROM t
        ORDER BY a NULLS FIRST
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: order by desc nulls last', (t) => {
    const source = montag`
        SELECT a
        FROM t
        ORDER BY a DESC NULLS LAST
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: update or abort', (t) => {
    const source = montag`
        UPDATE OR ABORT t
        SET a = 1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: update or fail', (t) => {
    const source = montag`
        UPDATE OR FAIL t
        SET a = 1
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: analyze qualified table', (t) => {
    const source = 'ANALYZE schema.t';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: like escape', (t) => {
    const source = montag`
        SELECT a
        FROM t
        WHERE b LIKE 'x%' ESCAPE '!'
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: round-trip: like escape backslash', (t) => {
    const source = 'SELECT a\nFROM t\n' + `WHERE b LIKE 'x%' ESCAPE '${String.fromCharCode(92)}'` + '\n';
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, source);
    t.end();
});

test('happy-sql: round-trip: count distinct', (t) => {
    const source = montag`
        SELECT count(DISTINCT a)
        FROM t
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    
    t.equal(result, 'SELECT COUNT(DISTINCT a)\nFROM t\n');
    t.end();
});
