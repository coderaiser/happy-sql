import {__sql_name, fromJS} from '@putout/operator-json';
import {convertJsToSql, convertSqlToJs} from '#happy-sql';

export function convert(source) {
    if (source.startsWith(__sql_name))
        return convertJsToSql(fromJS(source, __sql_name));
    
    if (source.startsWith('['))
        return convertJsToSql(source);
    
    return convertSqlToJs(source);
}
