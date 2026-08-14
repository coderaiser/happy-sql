import {createTest as createPutoutTest} from '@putout/test';
import {
    convertJsToSql,
    parseSqlNode,
    printSql,
} from '#happy-sql';

const noop = () => {};

const lint = (source) => {
    const code = convertJsToSql(source);
    
    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => createPutoutTest(url, {
    extension: 'sql',
    lint,
    plugins: [
        ['sql', {
            report: noop,
            replace: noop,
        }],
    ],
    ...options,
});
