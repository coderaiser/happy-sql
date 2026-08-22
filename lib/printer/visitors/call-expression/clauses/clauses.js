import {join} from './join/join.js';
import {on} from './on/on.js';
import {select} from './select/select.js';
import {from} from './from/from.js';
import {where} from './where/where.js';
import {insert} from './insert/insert.js';
import {into} from './into/into.js';
import {values} from './values/values.js';
import {onConflict} from './on-conflict/on-conflict.js';
import {update} from './update/update.js';
import {set} from './set/set.js';
import {deleteFrom} from './delete/delete.js';
import {section} from './section/section.js';
import {count} from './count/count.js';
import {returning} from './returning/returning.js';
import {withNamed} from './with-named/with-named.js';
import {withRecursive} from './with-recursive/with-recursive.js';
import {unionAll} from './union-all/union-all.js';
import {groupBy} from './group-by/group-by.js';
import {having} from './having/having.js';
import {sum} from './sum/sum.js';
import {avg} from './avg/avg.js';
import {min} from './min/min.js';
import {max} from './max/max.js';
import {createTable} from './create-table/create-table.js';
import {createSequence} from './create-sequence/create-sequence.js';
import {column} from './column/column.js';
import {autoIncrement} from './auto-increment/auto-increment.js';
import {serial} from './serial/serial.js';
import {primaryKey} from './primary-key/primary-key.js';
import {lastInsertRowid} from './last-insert-rowid/last-insert-rowid.js';
import {lastval} from './lastval/lastval.js';
import {nextval} from './nextval/nextval.js';
import {like} from './like/like.js';
import {isNull, isNotNull} from './is-null/is-null.js';
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
    values,
    onConflict,
    update,
    set,
    deleteFrom,
    section,
    returning,
    withNamed,
    withRecursive,
    unionAll,
    groupBy,
    having,
    sum,
    avg,
    min,
    max,
    createTable,
    createSequence,
    column,
    autoIncrement,
    serial,
    primaryKey,
    lastInsertRowid,
    lastval,
    nextval,
    like,
    isNull,
    isNotNull,
    inList,
    identity,
    identityByDefault,
};
