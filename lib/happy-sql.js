import {parse} from '@putout/babel';
import {print} from '@putout/printer';
import {parseSql} from '#parser';
import {printSql} from '#printer';

export {printSql} from '#printer';
export {parseSql} from '#parser';

export const convertSqlToJs = (sql) => print(parseSql(sql), {
    semantics: {
        maxArgsInOneLine: 1,
    },
});

export const convertJsToSql = (js) => printSql(parse(js, {
    plugins: [
        ['typescript'],
    ],
}));
