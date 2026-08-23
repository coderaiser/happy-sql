import {StringLiteral} from './string-literal.js';
import {NullLiteral} from './null-literal.js';
import {BooleanLiteral} from './boolean-literal.js';
import {ArrayExpression} from './array-expression.js';
import {ExpressionStatement} from './expression-statement.js';
import {CallExpression} from './call-expression/call-expression.js';
import {BinaryExpression} from './binary-expression.js';
import {LogicalExpression} from './logical-expression.js';
import {MemberExpression} from './member-expression.js';

export const visitors = {
    ArrayExpression,
    CallExpression,
    StringLiteral,
    NullLiteral,
    BooleanLiteral,
    ExpressionStatement,
    BinaryExpression,
    LogicalExpression,
    MemberExpression,
};
