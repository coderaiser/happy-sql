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

test('happy-sql: parser: clause: operand: quantifier: single expr', (t) => {
    const result = toString(convertOperand({
        type: 'quantifier_expr',
        quantifierKw: {
            name: 'ANY',
        },
        expr: {
            type: 'paren_expr',
            expr: {
                type: 'number_literal',
                value: 1,
            },
        },
    }));
    
    const expected = 'ANY(1);';
    
    t.equal(result, expected);
    t.end();
});
