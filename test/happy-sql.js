import {test} from 'supertape';
import {montag} from 'montag';
import {print} from '@putout/printer';
import {tryCatch} from 'try-catch';
import * as babel from '@putout/babel';
import {
    convertJsToMarkdown,
    convertMarkdownToJs,
    parseMarkdown,
    printMarkdown,
} from '#happy-sql';

const {
    traverse,
    parse,
    types,
} = babel;

test('happy-sql: roundtrip: basic', (t) => {
    const source = '# hello\n\nHello world\n\n```js\nconst a = 3;\n```';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = '# hello\n\nHello world\n\n```js\nconst a = 3;\n```\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: roundtrip: inline formatting', (t) => {
    const source = '**bold** *italic* `code` ~~strike~~';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = '**bold** *italic* `code` ~~strike~~\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: emphasis', (t) => {
    const source = montag`
        *italic*
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        *italic*\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: delete', (t) => {
    const source = montag`
        ~~strike~~
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ~~strike~~\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: inlineCode', (t) => {
    const source = montag`
        \`code\`
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        \`code\`\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: link', (t) => {
    const source = montag`
        [link](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        [link](url)\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: image', (t) => {
    const source = montag`
        ![alt](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ![alt](url)\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: hr', (t) => {
    const source = montag`
        ---
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ---\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: ul', (t) => {
    const source = montag`
        - item
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        - item\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: ol', (t) => {
    const source = montag`
        1. item
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        1. item\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parseMarkdown: code: no lang', (t) => {
    const source = montag`
        \`\`\`
        code
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        [
            codeblock('', 'code'),
        ];
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parseMarkdown: image: no alt', (t) => {
    const source = montag`
        ![](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        [
            paragraph(image('', 'url')),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parseMarkdown: unknown block type html', (t) => {
    const source = montag`
        <div>test</div>
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        [
            html('<div>test</div>'),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: parseMarkdown: unknown inline type', (t) => {
    const source = 'a\n  b';
    const ast = parseMarkdown(source);
    
    const result = printMarkdown(ast);
    const expected = 'a\nb\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: code: no lang', (t) => {
    const source = montag`
        \`\`\`
        code
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        [
            codeblock('', 'code'),
        ];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: image: no alt', (t) => {
    const source = montag`
        ![](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ![](url)\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: blockquote', (t) => {
    const source = montag`
        > quote
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        > quote\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: unknown block type html', (t) => {
    const source = montag`
        <div>test</div>
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = '<div>test</div>\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: js -> markdown', (t) => {
    const source = montag`
        # hello
    `;
    
    const ast = parseMarkdown(source);
    
    traverse(ast, {
        CallExpression(path) {
            if (path.node.callee.name === 'heading')
                path.node.arguments[0].value = 2;
        },
    });
    const js = print(ast);
    const jsAST = parse(js);
    const result = printMarkdown(jsAST);
    
    const expected = montag`
        ## hello\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: end of file', (t) => {
    const source = montag`
        ## License
        
        MIT\n
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    t.equal(result, source);
    t.end();
});

test('happy-sql: badges', (t) => {
    const source = montag`
        # Hello [![License][NPMURL]][NPMIMGURL]
        
        [NPMURL]: https://npmjs.org/package/hello "npm"
        [NPMIMGURL]: https://img.shields.io/npm/v/hello.svg?style=flat
    
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    t.equal(result, source);
    t.end();
});

test('happy-sql: printMarkdown: link with title', (t) => {
    const source = '[text](url "title")';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = '[text](url "title")\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: raw handler', (t) => {
    const ast = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('raw'), [
                types.stringLiteral('someType'),
            ]),
        ])),
    ]));
    
    const result = printMarkdown(ast);
    const expected = 'someType\n';
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: printMarkdown: error on unknown', (t) => {
    const ast = types.file(types.program([
        types.expressionStatement(types.arrayExpression([
            types.callExpression(types.identifier('unknownBlock'), []),
        ])),
    ]));
    
    const [error] = tryCatch(printMarkdown, ast);
    
    t.match(error.message, 'not supported yet');
    t.end();
});

test('happy-sql: convertMarkdownToJs', (t) => {
    const source = montag`
        # hello
        
        world
    `;
    
    const result = convertMarkdownToJs(source);
    
    const expected = montag`
        [
            heading(1, 'hello'),
            paragraph('world'),
        ];
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('happy-sql: convertJsToMarkdown', (t) => {
    const source = montag`
        [
            heading(1, 'hello'),
            paragraph('world'),
        ];
    `;
    
    const result = convertJsToMarkdown(source);
    
    const expected = montag`
        # hello
        
        world
    
    `;
    
    t.equal(result, expected);
    t.end();
});
