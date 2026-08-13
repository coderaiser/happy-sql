import {select} from './select/select.js';
import {from} from './from/from.js';
import {where} from './where/where.js';
import {insert} from './insert/insert.js';
import {into} from './into/into.js';
import {values} from './values/values.js';
import {onConflict} from './on-conflict/on-conflict.js';
import {update} from './update/update.js';
import {set} from './set/set.js';
import {del} from './delete/delete.js';
import {section} from './section/section.js';
import {count} from './count/count.js';
import {returning} from './returning/returning.js';
import {as} from './as/as.js';
import {withNamed} from './with-named/with-named.js';
import {createTable} from './create-table/create-table.js';
import {column} from './column/column.js';
import {autoIncrement} from './auto-increment/auto-increment.js';
import {serial} from './serial/serial.js';
import {primaryKey} from './primary-key/primary-key.js';

export const clauses = {
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
    delete: del,
    section,
    returning,
    as,
    withNamed,
    createTable,
    column,
    autoIncrement,
    serial,
    primaryKey,
};
