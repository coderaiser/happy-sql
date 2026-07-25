import {parse} from '@putout/babel';
import {print} from '@putout/printer';
import {parseSqlNode} from '#parser';
import {printSql} from '#printer';

export {printSql} from '#printer';
export {parseSqlNode} from '#parser';

export const convertSqlToJs = (sql) => print(parseSqlNode(sql));

export const convertJsToSql = (js) => printSql(parse(js));
