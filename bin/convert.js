import {
    __markdown_name,
    fromJS,
} from '@putout/operator-json';
import {convertJsToSql, convertSqlToJs} from '#happy-sql';

export function convert(source) {
    if (source.startsWith(__markdown_name))
        return convertJsToSql(fromJS(
            source,
            __markdown_name,
        ));
    
    if (source.startsWith('['))
        return convertJsToSql(source);
    
    return convertSqlToJs(source);
}
