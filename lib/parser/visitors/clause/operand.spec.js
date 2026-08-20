import test from 'supertape';
import {print} from '@putout/printer';
import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';

const {
    file,
    program,
    expressionStatement,
} = types;

const toString = (ast) => print(file(program([
    expressionStatement(ast),
]))).trim();

test('happy-sql: parser: clause: operand: member_expr', (t) => {
    const ast = convertOperand({
        type: 'member_expr',
        object: {
            name: 'a',
        },
        property: {
            name: 'b',
        },
    });
    
    const result = toString(ast);
    const expected = 'a.b;';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: operand: boolean_literal', (t) => {
    const ast = convertOperand({
        type: 'boolean_literal',
        value: true,
    });
    
    const result = toString(ast);
    const expected = 'true;';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: operand: null_literal', (t) => {
    const ast = convertOperand({
        type: 'null_literal',
        value: null,
    });
    
    const result = toString(ast);
    const expected = 'null;';
    
    t.equal(result, expected);
    t.end();
});
