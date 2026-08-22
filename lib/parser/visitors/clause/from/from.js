import {types} from '@putout/babel';
import {convertOperand} from '#parser/clause/operand';
import {convertBetween} from '#parser/clause/where';
import {convertClause} from '#parser/clause';
import {convertGroupBy} from './group-by.js';
import {convertHaving} from './having.js';
import {convertOrderBy} from './order-by.js';
import {convertLimit} from './limit.js';
import {convertTableFunc} from './table-func.js';

const isString = (a) => typeof a === 'string';

const {
    identifier,
    callExpression,
    binaryExpression,
    logicalExpression,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
} = types;

const opName = (op) => {
    if (Array.isArray(op))
        return op
            .map((k) => k.name)
            .join(' ');
    
    if (isString(op))
        return op;
    
    return op?.name ?? '';
};

const SQL_TO_JS_OP = {
    '=': '===',
    '!=': '!==',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
};

const convertBinary = (node) => {
    const op = opName(node.operator);
    
    if (op === 'LIKE')
        return callExpression(identifier('like'), [
            convertOperand(node.left),
            convertOperand(node.right),
        ]);
    
    if (op === 'IS')
        return callExpression(identifier('isNull'), [
            convertOperand(node.left),
        ]);
    
    if (op === 'IS NOT')
        return callExpression(identifier('isNotNull'), [
            convertOperand(node.left),
        ]);
    
    if (op === 'IN') {
        const inner = node.right.expr;
        
        if (isSubqueryExpr(inner))
            return callExpression(identifier('inQuery'), [
                convertOperand(node.left),
                convertClause(inner),
            ]);
        
        const {items} = inner;
        const args = [
            convertOperand(node.left),
        ];
        
        for (const item of items)
            args.push(convertOperand(item));
        
        return callExpression(identifier('inList'), args);
    }
    
    if (op === 'NOT IN') {
        const items = node.right.expr.items.map(convertOperand);
        
        return callExpression(identifier('notInList'), [
            convertOperand(node.left),
            ...items,
        ]);
    }
    
    const jsOp = SQL_TO_JS_OP[op] ?? '===';
    
    return binaryExpression(
        jsOp,
        convertOperand(node.left),
        convertOperand(node.right),
    );
};

const isExists = (node) => node.type === 'prefix_op_expr' && node.operator.name === 'EXISTS';

const convertCondition = (node) => {
    if (node.operator && node.operator.name === 'AND')
        return logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
    
    if (node.operator && node.operator.name === 'OR')
        return logicalExpression('||', convertCondition(node.left), convertCondition(node.right));
    
    if (node.type === 'between_expr')
        return convertBetween(node);
    
    if (isExists(node))
        return callExpression(identifier('exists'), [
            convertClause(node.expr.expr),
        ]);
    
    return convertBinary(node);
};

const convertOn = (spec) => callExpression(identifier('on'), [
    convertCondition(spec.expr),
]);

const isSubquery = (node) => node.type === 'paren_expr';
const isSubqueryExpr = (node) => node.type === 'select_stmt';

const convertAlias = (node) => {
    if (node.type !== 'alias')
        return identifier(node.name);
    
    if (isSubquery(node.expr)) {
        const inner = node.expr.expr;
        const aliasName = node.alias.name;
        
        return tsAsExpression(callExpression(identifier('subquery'), [
            convertClause(inner),
        ]), tsLiteralType(stringLiteral(aliasName)));
    }
    
    return tsAsExpression(identifier(node.expr.name), tsLiteralType(stringLiteral(node.alias.name)));
};

const joinTypeParts = (operator) => {
    if (!operator)
        return [];
    
    if (!Array.isArray(operator))
        return [operator.name];
    
    const parts = [];
    
    for (const kw of operator)
        parts.push(kw.name);
    
    return parts;
};

const convertJoinType = (operator) => {
    const parts = joinTypeParts(operator);
    
    // drop the trailing JOIN keyword — gives us LEFT, RIGHT, INNER, LEFT OUTER
    parts.pop();
    
    if (!parts.length)
        return 'join';
    
    // 'LEFT OUTER' → 'leftOuter' → 'leftOuterJoin'
    const camel = parts[0].toLowerCase() + parts
        .slice(1)
        .map((s) => s[0].toUpperCase() + s
            .slice(1)
            .toLowerCase())
        .join('');
    
    return `${camel}Join`;
};

const flattenJoins = (node, joins = []) => {
    if (node.type === 'join_expr') {
        flattenJoins(node.left, joins);
        
        const fnName = convertJoinType(node.operator);
        
        joins.push(callExpression(identifier(fnName), [
            convertAlias(node.right),
            convertOn(node.specification),
        ]));
        
        return joins;
    }
    
    joins.unshift(convertAlias(node));
    
    return joins;
};

export const convertFrom = ({expr, whereClause, groupByClause, havingClause, orderByClause, limitClause}) => {
    const fromArgs = [];
    
    if (whereClause)
        fromArgs.push(callExpression(identifier('where'), [
            convertCondition(whereClause.expr),
        ]));
    
    if (groupByClause)
        fromArgs.push(convertGroupBy(groupByClause));
    
    if (havingClause)
        fromArgs.push(convertHaving(havingClause));
    
    if (orderByClause)
        fromArgs.push(convertOrderBy(orderByClause));
    
    if (limitClause)
        fromArgs.push(convertLimit(limitClause));
    
    if (expr.type === 'join_expr') {
        const parts = flattenJoins(expr);
        return callExpression(identifier('from'), parts);
    }
    
    if (expr.type === 'alias')
        return callExpression(identifier('from'), [
            convertAlias(expr),
            ...fromArgs,
        ]);
    
    if (expr.type === 'func_call')
        return callExpression(identifier('from'), [
            convertTableFunc(expr),
            ...fromArgs,
        ]);
    
    return callExpression(identifier('from'), [
        identifier(expr.name),
        ...fromArgs,
    ]);
};
