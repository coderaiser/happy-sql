import {fullOuterJoin} from './full-outer-join/full-outer-join.js';
import {join} from './join/join.js';
import {naturalJoin} from './natural-join/natural-join.js';
import {notLike} from './not-like/not-like.js';
import {ilike} from './ilike/ilike.js';
import {similarTo} from './similar-to/similar-to.js';
import {isDistinctFrom} from './is-distinct-from/is-distinct-from.js';
import {on} from './on/on.js';
import {select} from './select/select.js';
import {from} from './from/from.js';
import {where} from './where/where.js';
import {insert} from './insert/insert.js';
import {into} from './into/into.js';
import {values} from './values/values.js';
import {onConflict} from './on-conflict/on-conflict.js';
import {update} from './update/update.js';
import {updateFrom} from './update-from/update-from.js';
import {set} from './set/set.js';
import {deleteFrom} from './delete/delete.js';
import {section} from './section/section.js';
import {count} from './count/count.js';
import {returning} from './returning/returning.js';
import {withNamed} from './with-named/with-named.js';
import {withRecursive} from './with-recursive/with-recursive.js';
import {unionAll} from './union-all/union-all.js';
import {union} from './union/union.js';
import {groupBy} from './group-by/group-by.js';
import {having} from './having/having.js';
import {sum} from './sum/sum.js';
import {avg} from './avg/avg.js';
import {min} from './min/min.js';
import {max} from './max/max.js';
import {orderBy} from './order-by/order-by.js';
import {desc} from './desc/desc.js';
import {limit} from './limit/limit.js';
import {distinct} from './distinct/distinct.js';
import {notInList} from './not-in-list/not-in-list.js';
import {between} from './between/between.js';
import {notBetween} from './not-between/not-between.js';
import {subquery} from './subquery/subquery.js';
import {inQuery} from './in-query/in-query.js';
import {exists} from './exists/exists.js';
import {notExists} from './not-exists/not-exists.js';
import {cast} from './cast/cast.js';
import {pgCast} from './pg-cast/pg-cast.js';
import {ANY} from './any/any.js';
import {ALL} from './all/all.js';
import {caseWhen} from './case-when/case-when.js';
import {leftJoin} from './left-join/left-join.js';
import {rightJoin} from './right-join/right-join.js';
import {innerJoin} from './inner-join/inner-join.js';
import {leftOuterJoin} from './left-outer-join/left-outer-join.js';
import {crossJoin} from './cross-join/cross-join.js';
import {createTable} from './create-table/create-table.js';
import {alterTable} from './alter-table/alter-table.js';
import {addColumn} from './add-column/add-column.js';
import {dropColumn} from './drop-column/drop-column.js';
import {renameColumn} from './rename-column/rename-column.js';
import {alterColumnType} from './alter-column-type/alter-column-type.js';
import {begin} from './begin/begin.js';
import {commit} from './commit/commit.js';
import {rollback} from './rollback/rollback.js';
import {rollbackTo} from './rollback-to/rollback-to.js';
import {savepoint} from './savepoint/savepoint.js';
import {createSequence} from './create-sequence/create-sequence.js';
import {extract} from './extract/extract.js';
import {concat} from './concat/concat.js';
import {array} from './array/array.js';
import {over} from './over/over.js';
import {partitionBy} from './partition-by/partition-by.js';
import {rowNumber} from './row-number/row-number.js';
import {dropTable} from './drop-table/drop-table.js';
import {dropIndex} from './drop-index/drop-index.js';
import {pragma} from './pragma/pragma.js';
import {attach} from './attach/attach.js';
import {column} from './column/column.js';
import {autoIncrement} from './auto-increment/auto-increment.js';
import {serial} from './serial/serial.js';
import {primaryKey} from './primary-key/primary-key.js';
import {lastInsertRowid} from './last-insert-rowid/last-insert-rowid.js';
import {lastval} from './lastval/lastval.js';
import {nextval} from './nextval/nextval.js';
import {like} from './like/like.js';
import {isNull, isNotNull} from './is-null/is-null.js';
import {orReplace} from './or-replace/or-replace.js';
import {orIgnore} from './or-ignore/or-ignore.js';
import {inList} from './in-list/in-list.js';
import {
    identity,
    identityByDefault,
} from './identity/identity.js';

export const clauses = {
    join,
    on,
    count,
    from,
    select,
    where,
    insert,
    into,
    orReplace,
    orIgnore,
    pgCast,
    ANY,
    ALL,
    values,
    onConflict,
    update,
    updateFrom,
    set,
    deleteFrom,
    section,
    returning,
    withNamed,
    withRecursive,
    unionAll,
    union,
    groupBy,
    having,
    sum,
    avg,
    min,
    max,
    orderBy,
    desc,
    limit,
    distinct,
    notInList,
    notBetween,
    between,
    subquery,
    inQuery,
    exists,
    notExists,
    cast,
    caseWhen,
    leftJoin,
    rightJoin,
    innerJoin,
    leftOuterJoin,
    fullOuterJoin,
    naturalJoin,
    crossJoin,
    createTable,
    alterTable,
    addColumn,
    dropColumn,
    renameColumn,
    alterColumnType,
    begin,
    commit,
    rollback,
    rollbackTo,
    savepoint,
    createSequence,
    extract,
    concat,
    array,
    over,
    partitionBy,
    rowNumber,
    dropTable,
    dropIndex,
    pragma,
    attach,
    column,
    autoIncrement,
    serial,
    primaryKey,
    lastInsertRowid,
    lastval,
    nextval,
    like,
    notLike,
    ilike,
    similarTo,
    isDistinctFrom,
    isNull,
    isNotNull,
    inList,
    identity,
    identityByDefault,
};
