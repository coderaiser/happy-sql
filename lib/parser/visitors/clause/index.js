import {types} from '@putout/babel';
import {convertSelect} from './select/select.js';
import {convertInsert} from './insert/insert.js';
import {convertUpdate} from './update/update.js';
import {convertDelete} from './delete/delete.js';

const {identifier, callExpression} = types;

export const convertClause = (stmt) => {
    const {type} = stmt;
    const visitor = clauseVisitors[type];

    if (visitor)
        return visitor(stmt);

    throw Error(`${type} not supported yet`);
};

const clauseVisitors = {
    select_stmt: convertSelect,
    insert_stmt: convertInsert,
    update_stmt: convertUpdate,
    delete_stmt: convertDelete,
};
