import test from 'supertape';
import {print} from '@putout/printer';
import {parse as parseCst} from 'sql-parser-cst';
import {convertInsert} from '#parser/clause/insert';

const toString = (ast) => print(ast).trim();

const convert = (source) => {
    const [stmt] = parseCst(source, {
        dialect: 'sqlite',
        paramTypes: [':name'],
    }).statements;
    
    return convertInsert(stmt);
};

test('happy-sql: parser: clause: insert: OR REPLACE', (t) => {
    const result = toString(convert('INSERT OR REPLACE INTO t (id) VALUES (1)'));
    const expected = 'insert(orReplace(), into(t, id, values(1)));';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: insert: OR IGNORE', (t) => {
    const result = toString(convert('INSERT OR IGNORE INTO t (id) VALUES (1)'));
    const expected = 'insert(orIgnore(), into(t, id, values(1)));';
    
    t.equal(result, expected);
    t.end();
});
