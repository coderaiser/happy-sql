const JSON_OPS = new Set([
    '->',
    '->>',
    '#>',
    '#>>',
    '?',
    '?|',
    '?&',
    '@>',
    '<@',
]);

export const isJsonTuple = (node) =>
    node.type === 'ArrayExpression' &&
    node.elements.length === 3 &&
    node.elements[1].type === 'StringLiteral' &&
    JSON_OPS.has(node.elements[1].value);

export const printJsonTuple = (path, {write, traverse}) => {
    const elems = path.get('elements');
    
    traverse(elems[0]);
    write(` ${elems[1].node.value} `);
    traverse(elems[2]);
};
