import {test} from 'supertape';
import {montag} from 'montag';
import {__sql_name, toJS} from '@putout/operator-json';
import {convert} from './convert.js';

test('happy-sql: bin: convert: js: [', (t) => {
    const result = convert(`[select('*', from(users))]`);
    const expected = montag`
        SELECT *
        FROM users
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: bin: convert: js: __putout_processor_sql', (t) => {
    const js = toJS(`[select('*', from(users))]`, __sql_name);
    const result = convert(js);
    
    const expected = montag`
        SELECT *
        FROM users
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: bin: convert: __putout_processor_sql', (t) => {
    const source = 'SELECT * FROM users';
    const result = convert(source);
    
    const expected = montag`
        [
            select(
                '*',
                from(
                    users,
                ),
            ),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});
