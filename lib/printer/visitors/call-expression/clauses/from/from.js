import {types} from '@putout/babel';
import {createTypeChecker} from '@putout/printer/type-checker';

const {isTSAsExpression} = types;

const printAsExpression = (path, {write, traverse}) => {
    const expr = path.get('expression');
    
    if (isTableFunc(expr))
        printTableFunc(expr, {
            write,
            traverse,
        });
    else
        traverse(expr);
    
    if (isSubqueryAlias(expr))
        write(' ');
    else
        write(' AS ');
    
    write(path.node.typeAnnotation.literal.value);
};

const isSubqueryAlias = createTypeChecker([
    ['+: node.callee.name', '=', 'subquery'],
    ['+: node.callee.name', '=', 'lateralSubquery'],
]);

const isTableFunc = createTypeChecker([
    ['-: node.callee.name', '=', 'where'],
    ['-: node.callee.name', '=', 'groupBy'],
    ['-: node.callee.name', '=', 'having'],
    ['-: node.callee.name', '=', 'namedWindow'],
    ['-: node.callee.name', '=', 'orderBy'],
    ['-: node.callee.name', '=', 'limit'],
    ['-: node.callee.name', '=', 'limitAll'],
    ['-: node.callee.name', '=', 'offset'],
    ['-: node.callee.name', '=', 'fetchFirst'],
    ['-: node.callee.name', '=', 'forUpdate'],
    ['-: node.callee.name', '=', 'join'],
    ['-: node.callee.name', '=', 'leftJoin'],
    ['-: node.callee.name', '=', 'rightJoin'],
    ['-: node.callee.name', '=', 'rightOuterJoin'],
    ['-: node.callee.name', '=', 'innerJoin'],
    ['-: node.callee.name', '=', 'leftOuterJoin'],
    ['-: node.callee.name', '=', 'fullOuterJoin'],
    ['-: node.callee.name', '=', 'naturalJoin'],
    ['-: node.callee.name', '=', 'crossJoin'],
    ['-: node.callee.name', '=', 'on'],
    ['-: node.callee.name', '=', 'subquery'],
    ['-: node.callee.name', '=', 'lateralJoin'],
    ['-: node.callee.name', '=', 'lateralSubquery'],
    ['-: node.callee.name', '=', 'indexedBy'],
    ['-: node.callee.name', '=', 'notIndexed'],
    '+: node -> CallExpression',
]);

const isClause = createTypeChecker([
    ['+: node.callee.name', '=', 'where'],
    ['+: node.callee.name', '=', 'groupBy'],
    ['+: node.callee.name', '=', 'having'],
    ['+: node.callee.name', '=', 'namedWindow'],
    ['+: node.callee.name', '=', 'orderBy'],
    ['+: node.callee.name', '=', 'limit'],
    ['+: node.callee.name', '=', 'limitAll'],
    ['+: node.callee.name', '=', 'offset'],
    ['+: node.callee.name', '=', 'fetchFirst'],
    ['+: node.callee.name', '=', 'forUpdate'],
]);

const CAMEL_RE = /([A-Z])/g;
const toSnake = (a) => a.replace(CAMEL_RE, (_, c) => `_${c.toLowerCase()}`);

// single-word ALL-CAPS functions (UNNEST) keep their casing
const ALL_CAPS_RE = /^[A-Z]+$/;

const toFuncName = (name) => {
    if (ALL_CAPS_RE.test(name))
        return name;
    
    return toSnake(name);
};

const printTableFunc = (path, {write, traverse}) => {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    write(toFuncName(name));
    write('(');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};

const printArg = (path, printer) => {
    const {node} = path;
    const {traverse} = printer;
    
    if (isTSAsExpression(node))
        return printAsExpression(path, printer);
    
    if (isTableFunc(path))
        return printTableFunc(path, printer);
    
    traverse(path);
};

export const from = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const tableArgs = [];
    const clauseArgs = [];
    
    for (const arg of args) {
        if (isClause(arg))
            clauseArgs.push(arg);
        else
            tableArgs.push(arg);
    }
    
    write('FROM ');
    printArg(tableArgs[0], {
        write,
        traverse,
    });
    
    for (let i = 1; i < tableArgs.length; i++)
        printArg(tableArgs[i], {
            write,
            traverse,
        });
    
    for (const clause of clauseArgs) {
        write.breakline();
        traverse(clause);
    }
};
