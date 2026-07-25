import {test} from 'supertape';
import {montag} from 'montag';
import {
    __markdown_name,
    toJS,
} from '@putout/operator-json';
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

test('happy-sql: bin: convert: js: __putout_processor_markdown', (t) => {
    const js = toJS(`[select('*', from(users))]`, __markdown_name);
    
    const result = convert(js);
    const expected = montag`
        SELECT *
        FROM users
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: bin: convert: markdown: __putout_processor_markdown', (t) => {
    const source = 'SELECT * FROM users';
    
    const result = convert(source);
    
    const expected = montag`
        [
            select('*', from(users)),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});
