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

export const clauses = {
    select,
    from,
    where,
    insert,
    into,
    values,
    onConflict,
    update,
    set,
    delete: del,
    section,
};
