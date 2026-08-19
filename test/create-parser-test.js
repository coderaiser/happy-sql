import {createTest as createPutoutTest} from '@putout/test';
import {parse} from '@putout/babel';
import {convertSqlToJs} from '#happy-sql';

const noop = () => {};

const lint = (source) => {
    const code = convertSqlToJs(source);
    parse(code, {
        plugins: [
            ['typescript'],
        ],
    });
    
    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => createPutoutTest(url, {
    extension: 'sql',
    extensionFix: 'js',
    lint,
    plugins: [
        ['sql', {
            report: noop,
            replace: noop,
        }],
    ],
    ...options,
});
