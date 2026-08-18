import {test} from 'supertape';
import {montag} from 'montag';
import {tryCatch} from 'try-catch';
import {types} from '@putout/babel';
import {
    parseSqlNode,
    printSql,
    convertSqlToJs,
    convertJsToSql,
} from '#happy-sql';

test('happy-sql: roundtrip: select star', (t) => {
    const source = 'SELECT *\nFROM users\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select columns', (t) => {
    const source = 'SELECT id, start_line, start_col\nFROM VariableDeclaration\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select alias', (t) => {
    const source = `SELECT 'Prefer let over const' AS message, start_line AS line\nFROM VariableDeclaration\nWHERE file = :file\nAND kind = 'const'\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where param', (t) => {
    const source = 'SELECT *\nFROM users\nWHERE id = :id\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where and', (t) => {
    const source = `SELECT *\nFROM users\nWHERE file = :file\nAND kind = 'const'\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: where or', (t) => {
    const source = `SELECT *\nFROM users\nWHERE file = :file\nOR kind = 'const'\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert single', (t) => {
    const source = "INSERT INTO t (x) VALUES (':x')\n";
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert multi', (t) => {
    const source = "INSERT INTO t (x, y) VALUES (':x', ':y')\n";
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict nothing', (t) => {
    const source = "INSERT INTO t (x) VALUES (':x') ON CONFLICT DO NOTHING\n";
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict target nothing', (t) => {
    const source = "INSERT INTO t (x) VALUES (':x') ON CONFLICT (x) DO NOTHING\n";
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: on conflict update', (t) => {
    const source = "INSERT INTO t (x) VALUES (':x') ON CONFLICT (x) DO UPDATE SET x = :x\n";
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: update', (t) => {
    const source = `UPDATE VariableDeclaration\nSET kind = 'let'\nWHERE file = :file\nAND kind = 'const'\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: delete', (t) => {
    const source = 'DELETE FROM t\nWHERE id = :id\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: select star', (t) => {
    const result = convertSqlToJs('SELECT * FROM users');
    
    const expected = montag`
        [
            select('*', from(users)),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: where and', (t) => {
    const result = convertSqlToJs(`SELECT * FROM users WHERE file = :file AND kind = 'const'`);
    
    const expected = montag`
        [
            select('*', from(users), where(file === ':file' && kind === 'const')),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: insert on conflict', (t) => {
    const result = convertSqlToJs('INSERT INTO t (x) VALUES (:x) ON CONFLICT (x) DO UPDATE SET x = :x');
    
    const expected = montag`
        [
            insert(into(t, x, values(':x')), onConflict(x, set(x === ':x'))),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertJsToSql: select', (t) => {
    const source = montag`
        [
            select('*', from(users)),
        ];
    `;
    
    const result = convertJsToSql(source);
    const expected = 'SELECT *\nFROM users\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printSql: error on unknown', (t) => {
    const ast = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('unknownClause'), []),
        ])),
    ]));
    
    const [error] = tryCatch(printSql, ast);
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-sql: parseSqlNode: error on unknown statement type', (t) => {
    const [error] = tryCatch(parseSqlNode, 'DROP TABLE t');
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-sql: printSql: multiple statements', (t) => {
    const source = montag`
        [
            select('*', from(users)),
            select(id, from(VariableDeclaration)),
        ];
    `;
    
    const result = convertJsToSql(source);
    
    t.equal(result, 'SELECT *\nFROM users;\nSELECT id\nFROM VariableDeclaration\n');
    t.end();
});

test('happy-sql: roundtrip: section', (t) => {
    const source = '-- @select\nSELECT *\nFROM users;\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: section', (t) => {
    const result = convertSqlToJs('-- @select\nSELECT * FROM users');
    
    const expected = montag`
        [
            section('@select', select('*', from(users))),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: section multi', (t) => {
    const source = `-- @select\nSELECT *\nFROM users;\n-- @fix\nUPDATE users\nSET kind = 'let'\nWHERE id = :id;\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = `-- @select\nSELECT *\nFROM users;;\n-- @fix\nUPDATE users\nSET kind = 'let'\nWHERE id = :id;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: section multi', (t) => {
    const result = convertSqlToJs(`-- @select\nSELECT * FROM users;\n-- @fix\nUPDATE users SET kind = 'let' WHERE id = :id`);
    
    const expected = montag`
        [
            section('@select', select('*', from(users))),
            section('@fix', update(users, set(kind === 'let'), where(id === ':id'))),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printSql: count', (t) => {
    const source = montag`
        select(count('*'), from(users));
    `;
    
    const result = convertJsToSql(source);
    
    t.equal(result, 'SELECT COUNT(*)\nFROM users\n');
    t.end();
});

test('happy-sql: parseSqlNode: does not throw on last_insert_rowid', (t) => {
    const [error] = tryCatch(parseSqlNode, 'SELECT last_insert_rowid() FROM users');
    
    t.notOk(error);
    t.end();
});

test('happy-sql: parseSqlNode: does not throw on AUTOINCREMENT', (t) => {
    const [error] = tryCatch(parseSqlNode, 'CREATE TABLE t (id INTEGER PRIMARY KEY AUTOINCREMENT)');
    
    t.notOk(error);
    t.end();
});

test('happy-sql: parseSqlNode: error when cannot parse in any dialect', (t) => {
    const [error] = tryCatch(parseSqlNode, '>>>');
    
    t.equal(error.message, 'Cannot parse SQL');
    t.end();
});

test('happy-sql: roundtrip: create table autoincrement', (t) => {
    const source = 'CREATE TABLE t (id INTEGER PRIMARY KEY AUTOINCREMENT)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table with multiple columns', (t) => {
    const source = 'CREATE TABLE t (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: create table serial', (t) => {
    const source = 'CREATE TABLE t (id SERIAL PRIMARY KEY)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: create table', (t) => {
    const result = convertSqlToJs('CREATE TABLE t (id INTEGER PRIMARY KEY AUTOINCREMENT)');
    
    const expected = montag`
        [
            createTable(t, [
                column(id, INTEGER, primaryKey(), autoIncrement()),
            ]),
        ];
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: last_insert_rowid', (t) => {
    const source = 'SELECT last_insert_rowid()\nFROM users\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: lastval', (t) => {
    const source = 'SELECT lastval()\nFROM users\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertSqlToJs: nextval', (t) => {
    const result = convertSqlToJs(`CREATE TABLE users (id INTEGER DEFAULT nextval('users_id_seq') PRIMARY KEY)`);
    
    t.match(result, 'nextval(users_id_seq)');
    t.end();
});

test('happy-sql: roundtrip: create table nextval', (t) => {
    const source = `CREATE TABLE users (id INTEGER DEFAULT nextval('users_id_seq') PRIMARY KEY, name TEXT)\n`;
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = source;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: convert nextval', (t) => {
    const source = `CREATE TABLE users (id INTEGER DEFAULT nextval('users_id_seq') PRIMARY KEY, name TEXT)\n`;
    const result = convertJsToSql(convertSqlToJs(source));
    
    t.equal(result, source);
    t.end();
});

test('happy-sql: roundtrip: insert null', (t) => {
    const source = 'INSERT INTO t (x) VALUES (NULL)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'INSERT INTO t (x) VALUES (null)\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert true', (t) => {
    const source = 'INSERT INTO t (x) VALUES (TRUE)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'INSERT INTO t (x) VALUES (true)\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert false', (t) => {
    const source = 'INSERT INTO t (x) VALUES (FALSE)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'INSERT INTO t (x) VALUES (false)\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select where true', (t) => {
    const source = 'SELECT * FROM t WHERE active = TRUE\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM t\nWHERE active = true\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select where false', (t) => {
    const source = 'SELECT * FROM t WHERE active = FALSE\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM t\nWHERE active = false\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select where param', (t) => {
    const source = 'SELECT * FROM t WHERE name = :name\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM t\nWHERE name = :name\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: select where number', (t) => {
    const source = 'SELECT * FROM t WHERE id = 42\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM t\nWHERE id = 42\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: from alias', (t) => {
    const source = 'SELECT * FROM users AS u\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM users u\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: join on boolean', (t) => {
    const source = 'SELECT * FROM a JOIN b ON a.x = TRUE\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM a\nJOIN b ON a.x = true\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: join on null', (t) => {
    const source = 'SELECT * FROM a JOIN b ON a.x = NULL\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM a\nJOIN b ON a.x = null\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: join on identifier', (t) => {
    const source = 'SELECT * FROM a JOIN b ON a = b\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'SELECT *\nFROM a\nJOIN b ON a = b\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: insert member expression', (t) => {
    const source = 'INSERT INTO t (x) VALUES (a.b)\n';
    const ast = parseSqlNode(source);
    const result = printSql(ast);
    const expected = 'INSERT INTO t (x) VALUES (a.b)\n';
    
    t.equal(result, expected);
    t.end();
});
