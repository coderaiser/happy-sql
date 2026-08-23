import {convertSelect} from '#parser/clause/select';
import {convertInsert} from '#parser/clause/insert';
import {convertUpdate} from '#parser/clause/update';
import {convertDelete} from '#parser/clause/delete';
import {convertWithNamed} from '#parser/clause/with-named';
import {convertCreateTable} from '#parser/clause/create-table';
import {convertCreateSequence} from '#parser/clause/create-sequence';
import {convertAlterTable} from '#parser/clause/alter-table';
import {
    convertBegin,
    convertCommit,
    convertRollback,
    convertSavepoint,
} from '#parser/clause/transaction';
import {convertDropTable} from '#parser/clause/drop-table';
import {convertDropIndex} from '#parser/clause/drop-index';
import {convertPragma} from '#parser/clause/pragma';
import {convertAttach} from '#parser/clause/attach';
import {convertUnionAll} from '#parser/clause/union';
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

const convertSelectOrNamed = (stmt) => {
    const {clauses} = stmt;
    
    if (findClause(clauses, 'with_clause'))
        return convertWithNamed(stmt);
    
    return convertSelect(stmt);
};

const clauseVisitors = {
    select_stmt: convertSelectOrNamed,
    insert_stmt: convertInsertOrNamed,
    update_stmt: convertUpdate,
    delete_stmt: convertDelete,
    create_table_stmt: convertCreateTable,
    create_sequence_stmt: convertCreateSequence,
    alter_table_stmt: convertAlterTable,
    start_transaction_stmt: convertBegin,
    commit_transaction_stmt: convertCommit,
    rollback_transaction_stmt: convertRollback,
    savepoint_stmt: convertSavepoint,
    compound_select_stmt: convertUnionAll,
    drop_table_stmt: convertDropTable,
    drop_index_stmt: convertDropIndex,
    pragma_stmt: convertPragma,
    attach_database_stmt: convertAttach,
};
