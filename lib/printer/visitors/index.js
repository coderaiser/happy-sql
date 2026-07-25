import {StringLiteral} from './string-literal.js';
import {ExpressionStatement} from './expression-statement.js';
import {CallExpression} from './call-expression/call-expression.js';
import {ArrayExpression} from './array-expression.js';
import {BinaryExpression} from './binary-expression.js';
import {LogicalExpression} from './logical-expression.js';
import {AssignmentExpression} from './assignment-expression.js';

export const visitors = {
    ArrayExpression,
    CallExpression,
    StringLiteral,
    ExpressionStatement,
    BinaryExpression,
    LogicalExpression,
    AssignmentExpression,
};
