import test from 'supertape';
import {print} from '@putout/printer';
import {types} from '@putout/babel';
import {convertWhere} from '#parser/clause/where';

const {
    file,
    program,
    expressionStatement,
} = types;

const toString = (ast) => print(file(program([
    expressionStatement(ast),
]))).trim();

test('happy-sql: parser: clause: where: unknown operator falls back to ===', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                text: 'X',
            },
            left: {
                type: 'identifier',
                name: 'a',
            },
            right: {
                type: 'number_literal',
                value: 1,
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(a === 1);';
    
    t.equal(result, expected);
    t.end();
});
