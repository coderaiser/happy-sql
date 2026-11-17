import {types} from '@putout/babel';

const {
    isLogicalExpression,
    isCallExpression,
} = types;

const isInNot = ({parent}) => isCallExpression(parent) && parent.callee.name === 'not';
const needsParensIn = (node, op) => op === '&&' && isLogicalExpression(node) && node.operator === '||';

const printNestedOr = (node, printer) => {
    const {write, traverse} = printer;
    write('(');
    traverse(node.get('left'));
    write(' OR ');
    traverse(node.get('right'));
    write(')');
};

export const LogicalExpression = (path, {write, traverse}) => {
    const {node} = path;
    const op = node.operator === '&&' ? 'AND' : 'OR';
    const left = path.get('left');
    const right = path.get('right');
    const hasNestedParen = needsParensIn(left.node, node.operator) || needsParensIn(right.node, node.operator);
    const isInline = hasNestedParen || isInNot(path);
    
    if (needsParensIn(left.node, node.operator))
        printNestedOr(left, {
            write,
            traverse,
        });
    else
        traverse(left);
    
    if (isInline) {
        write(` ${op} `);
    } else {
        write.breakline();
        
        write(`${op} `);
    }
    
    if (needsParensIn(right.node, node.operator)) {
        printNestedOr(right, {
            write,
            traverse,
        });
        return;
    }
    
    traverse(right);
};
