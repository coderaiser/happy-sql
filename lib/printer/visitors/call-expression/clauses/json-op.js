import {types} from '@putout/babel';

const {
    isStringLiteral,
    isArrayExpression,
} = types;

const JSON_OPS = new Set([
    '->',
    '->>',
    '#>',
    '#>>',
    '?',
    '?|',
    '?&',
    '??',
    '@>',
    '<@',
]);

export const isJsonTuple = (node) => isArrayExpression(node) && node.elements.length === 3 && isStringLiteral(node.elements[1]) && JSON_OPS.has(node.elements[1].value);

export const printJsonTuple = (path, {write, traverse}) => {
    const elems = path.get('elements');
    
    traverse(elems[0]);
    write(` ${elems[1].node.value} `);
    traverse(elems[2]);
};
