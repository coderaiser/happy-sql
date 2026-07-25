import {createTest as createPutoutTest} from '@putout/test';
import {parseSqlNode, printSql} from '#happy-sql';

const noop = () => {};

const lint = (source) => {
    const ast = parseSqlNode(source);
    const code = printSql(ast);
    return {code, places: []};
};

export const createTest = (url, options) => createPutoutTest(url, {
    extension: 'sql',
    lint,
    plugins: [['sql', {report: noop, replace: noop}]],
    ...options,
});
