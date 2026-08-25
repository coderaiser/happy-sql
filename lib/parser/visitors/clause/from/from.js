import {types} from '@putout/babel';
import {convertBetween} from '#parser/clause/where';
import {convertClause} from '#parser/clause';
import {convertBinary} from '#parser/clause/binary';
import {convertOperand} from '#parser/clause/operand';
import {convertGroupBy} from './group-by.js';
import {convertHaving} from './having.js';
import {convertOrderBy} from './order-by.js';
import {convertLimit} from './limit.js';
import {convertTableFunc} from './table-func.js';

const {
    identifier,
    callExpression,
    logicalExpression,
    stringLiteral,
    tsAsExpression,
    tsLiteralType,
} = types;

const isExists = (node) => node.type === 'prefix_op_expr' && node.operator.name === 'EXISTS';
const isNotExists = (node) => node.type === 'prefix_op_expr' && node.operator.name === 'NOT' && isExists(node.expr);
const isParenExpr = (node) => node.type === 'paren_expr';

const POSTFIX_OP = {
    ISNULL: 'isNull',
    NOTNULL: 'isNotNull',
};

const convertPostfix = (node) => {
    const {name} = node.operator;
    const fn = POSTFIX_OP[name];
    
    return callExpression(identifier(fn), [
        convertOperand(node.expr),
    ]);
};

const convertCondition = (node) => {
    if (node.operator && node.operator.name === 'AND')
        return logicalExpression('&&', convertCondition(node.left), convertCondition(node.right));
    
    if (node.operator && node.operator.name === 'OR')
        return logicalExpression('||', convertCondition(node.left), convertCondition(node.right));
    
    if (node.type === 'between_expr')
        return convertBetween(node);
    
    if (node.type === 'postfix_op_expr')
        return convertPostfix(node);
    
    if (isNotExists(node))
        return callExpression(identifier('notExists'), [
            convertClause(node.expr.expr.expr),
        ]);
    
    if (isExists(node))
        return callExpression(identifier('exists'), [
            convertClause(node.expr.expr),
        ]);
    
    if (isParenExpr(node))
        return convertCondition(node.expr);
    
    return convertBinary(node);
};

const convertOn = (spec) => callExpression(identifier('on'), [
    convertCondition(spec.expr),
]);

const isIndexedTable = ({type}) => type === 'indexed_table';
const isNotIndexedTable = ({type}) => type === 'not_indexed_table';

const convertAlias = (node) => {
    if (isIndexedTable(node))
        return callExpression(identifier('indexedBy'), [
            identifier(node.table.name),
            identifier(node.index.name),
        ]);
    
    if (isNotIndexedTable(node))
        return callExpression(identifier('notIndexed'), [
            identifier(node.table.name),
        ]);
    
    if (node.type !== 'alias')
        return identifier(node.name);
    
    const isLateral = ({type}) => type === 'lateral_derived_table';
    
    if (isLateral(node.expr)) {
        const inner = node.expr.expr.expr;
        const aliasName = node.alias.name;
        
        return tsAsExpression(callExpression(identifier('lateralSubquery'), [
            convertClause(inner),
        ]), tsLiteralType(stringLiteral(aliasName)));
    }
    
    if (isParenExpr(node.expr)) {
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
    const camel = parts[0].toLowerCase() +
        parts
            .slice(1)
            .map((s) => s[0].toUpperCase() +
            s
                .slice(1)
                .toLowerCase())
            .join('');
    
    return `${camel}Join`;
};

const isNaturalJoin = (node) => joinTypeParts(node.operator).includes('NATURAL');

const isCommaJoin = (node) => node.operator === ',';

const isLateralAlias = ({expr}) => expr && expr.type === 'lateral_derived_table';

const isCrossJoin = (node) => !node.specification && !isNaturalJoin(node);

const convertCrossJoin = (node) => callExpression(identifier('crossJoin'), [
    convertAlias(node.right),
]);

const convertNaturalJoin = (node, fnName) => callExpression(identifier(fnName), [
    convertAlias(node.right),
]);

const flattenJoins = (node, joins = []) => {
    if (node.type === 'join_expr') {
        flattenJoins(node.left, joins);
        
        if (isCommaJoin(node) && isLateralAlias(node.right)) {
            joins.push(callExpression(identifier('lateralJoin'), [
                convertAlias(node.right),
            ]));
            
            return joins;
        }
        
        const fnName = convertJoinType(node.operator);
        
        if (isCrossJoin(node))
            joins.push(convertCrossJoin(node));
        else if (isNaturalJoin(node))
            joins.push(convertNaturalJoin(node, fnName));
        else
            joins.push(callExpression(identifier(fnName), [
                convertAlias(node.right),
                convertOn(node.specification),
            ]));
        
        return joins;
    }
    
    joins.unshift(convertAlias(node));
    
    return joins;
};

const convertWindow = (node) => {
    const {name} = node;
    const {expr} = node.window;
    const args = [
        identifier(name.name),
    ];
    
    const {partitionBy, orderBy} = expr;
    
    if (partitionBy)
        args.push(callExpression(identifier('partitionBy'), partitionBy.specifications.items.map(convertOperand)));
    
    if (orderBy)
        args.push(convertOrderBy(orderBy));
    
    return callExpression(identifier('namedWindow'), args);
};

export const convertFrom = ({expr, whereClause, groupByClause, havingClause, orderByClause, windowClause, limitClause}) => {
    const fromArgs = [];
    
    if (whereClause)
        fromArgs.push(callExpression(identifier('where'), [
            convertCondition(whereClause.expr),
        ]));
    
    if (groupByClause)
        fromArgs.push(convertGroupBy(groupByClause));
    
    if (havingClause)
        fromArgs.push(convertHaving(havingClause));
    
    if (windowClause)
        fromArgs.push(...windowClause.namedWindows.items.map(convertWindow));
    
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
        convertAlias(expr),
        ...fromArgs,
    ]);
};
