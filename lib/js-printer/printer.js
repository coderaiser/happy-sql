import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression.js';
import {LogicalExpression} from './visitors/logical-expression.js';

export const print = (ast) => putoutPrint(ast, {
    visitors: {
        CallExpression,
        LogicalExpression,
    },
});
