const needsParensIn = (node, op) =>
    op === '&&' && node.type === 'LogicalExpression' && node.operator === '||';

const printNestedOr = (node, printer) => {
    const {write, traverse} = printer;
    write('(');
    traverse(node.get('left'));
    write(' OR ');
    traverse(node.get('right'));
    write(')');
};

export const LogicalExpression = (path, {write, traverse}) => {
    const node = path.node;
    const op = node.operator === '&&' ? 'AND' : 'OR';
    const left = path.get('left');
    const right = path.get('right');
    const hasNestedParen = needsParensIn(left.node, node.operator) || needsParensIn(right.node, node.operator);
    const separator = hasNestedParen ? ` ${op} ` : `\n${op} `;

    if (needsParensIn(left.node, node.operator))
        printNestedOr(left, {
            write,
            traverse,
        });
    else
        traverse(left);

    write(separator);

    if (needsParensIn(right.node, node.operator))
        printNestedOr(right, {
            write,
            traverse,
        });
    else
        traverse(right);
};
