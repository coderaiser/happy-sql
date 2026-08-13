import {convertSelect} from '#parser/clause/select';
import {convertInsert} from '#parser/clause/insert';
import {convertUpdate} from '#parser/clause/update';
import {convertDelete} from '#parser/clause/delete';
import {convertWithNamed} from '#parser/clause/with-named';
import {convertCreateTable} from '#parser/clause/create-table';
import {findClause} from '#parser/clause/find';

export const convertClause = (stmt) => {
    const {type} = stmt;
    const visitor = clauseVisitors[type];
    
    if (visitor)
        return visitor(stmt);
    
    throw Error(`${type} not supported yet`);
};

const convertInsertOrNamed = (stmt) => {
    const {clauses} = stmt;
    
    if (findClause(clauses, 'with_clause'))
        return convertWithNamed(stmt);
    
    return convertInsert(stmt);
};

const clauseVisitors = {
    select_stmt: convertSelect,
    insert_stmt: convertInsertOrNamed,
    update_stmt: convertUpdate,
    delete_stmt: convertDelete,
    create_table_stmt: convertCreateTable,
};
