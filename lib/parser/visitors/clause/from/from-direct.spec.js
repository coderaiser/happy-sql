import test from 'supertape';
import {print} from '@putout/printer';
import {types} from '@putout/babel';
import {convertFrom} from './from.js';

const {file, program, expressionStatement} = types;

const toString = (ast) => print(file(program([expressionStatement(ast)]))).trim();

test('happy-sql: parser: clause: from: unknown operator falls back to ===', (t) => {
    const ast = convertFrom({
        expr: {
            type: 'join_expr',
            left: {type: 'identifier', name: 'a'},
            right: {type: 'identifier', name: 'b'},
            specification: {
                type: 'join_on',
                expr: {
                    type: 'binary_expr',
                    operator: {type: 'keyword', text: 'X'},
                    left: {type: 'identifier', name: 'x'},
                    right: {type: 'number_literal', value: 1},
                },
            },
        },
    });
    
    t.equal(toString(ast), 'from(a, join(b, on(x === 1)));');
    t.end();
});