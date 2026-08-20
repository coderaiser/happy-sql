import test from 'supertape';
import {print} from '@putout/printer';
import {types} from '@putout/babel';
import {montag} from 'montag';
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

test('happy-sql: parser: clause: where: IS becomes isNull', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'IS',
            },
            left: {
                type: 'identifier',
                name: 'x',
            },
            right: {
                type: 'null_literal',
                value: null,
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(isNull(x));';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: IS NOT becomes isNotNull', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'IS NOT',
            },
            left: {
                type: 'identifier',
                name: 'x',
            },
            right: {
                type: 'null_literal',
                value: null,
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(isNotNull(x));';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: IN becomes inList', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'IN',
            },
            left: {
                type: 'identifier',
                name: 'x',
            },
            right: {
                expr: {
                    items: [{
                        type: 'number_literal',
                        value: 1,
                    }, {
                        type: 'number_literal',
                        value: 2,
                    }],
                },
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(inList(x, 1, 2));';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: AND becomes &&', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'AND',
            },
            left: {
                type: 'binary_expr',
                operator: {
                    type: 'keyword',
                    name: '=',
                },
                left: {
                    type: 'identifier',
                    name: 'x',
                },
                right: {
                    type: 'number_literal',
                    value: 1,
                },
            },
            right: {
                type: 'binary_expr',
                operator: {
                    type: 'keyword',
                    name: '=',
                },
                left: {
                    type: 'identifier',
                    name: 'y',
                },
                right: {
                    type: 'number_literal',
                    value: 2,
                },
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(x === 1 && y === 2);';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: OR becomes ||', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'OR',
            },
            left: {
                type: 'binary_expr',
                operator: {
                    type: 'keyword',
                    name: '=',
                },
                left: {
                    type: 'identifier',
                    name: 'x',
                },
                right: {
                    type: 'number_literal',
                    value: 1,
                },
            },
            right: {
                type: 'binary_expr',
                operator: {
                    type: 'keyword',
                    name: '=',
                },
                left: {
                    type: 'identifier',
                    name: 'y',
                },
                right: {
                    type: 'number_literal',
                    value: 2,
                },
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(x === 1 || y === 2);';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: LIKE becomes like', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: {
                type: 'keyword',
                name: 'LIKE',
            },
            left: {
                type: 'identifier',
                name: 'x',
            },
            right: {
                type: 'string_literal',
                value: '%a%',
            },
        },
    });
    
    const result = toString(ast);
    const expected = montag`
        where(like(x, '%a%'));
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parser: clause: where: array operator joined with space', (t) => {
    const ast = convertWhere({
        expr: {
            type: 'binary_expr',
            operator: [{
                type: 'keyword',
                name: 'IS',
            }, {
                type: 'keyword',
                name: 'NOT',
            }],
            left: {
                type: 'identifier',
                name: 'x',
            },
            right: {
                type: 'null_literal',
                value: null,
            },
        },
    });
    
    const result = toString(ast);
    const expected = 'where(isNotNull(x));';
    
    t.equal(result, expected);
    t.end();
});
