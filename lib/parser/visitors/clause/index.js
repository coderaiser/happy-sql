import {types} from '@putout/babel';
import {convertSelect} from '#parser/clause/select';
import {convertInsert} from '#parser/clause/insert';
import {convertUpdate} from '#parser/clause/update';
import {convertDelete} from '#parser/clause/delete';
import {convertWithNamed} from '#parser/clause/with-named';
import {convertCreateTable} from '#parser/clause/create-table';
import {convertCreateIndex} from '#parser/clause/create-index';
import {convertCreateSequence} from '#parser/clause/create-sequence';
import {convertAlterTable} from '#parser/clause/alter-table';
import {convertDropTable} from '#parser/clause/drop-table';
import {convertDropIndex} from '#parser/clause/drop-index';
import {convertPragma} from '#parser/clause/pragma';
import {convertAttach} from '#parser/clause/attach';
import {convertUnion} from '#parser/clause/union';
import {findClause} from '#parser/clause/find';
import {
    convertBegin,
    convertCommit,
    convertRollback,
    convertSavepoint,
} from '#parser/clause/transaction';

const {identifier, callExpression} = types;

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
    compound_select_stmt: convertUnion,
    drop_table_stmt: convertDropTable,
    drop_index_stmt: convertDropIndex,
    pragma_stmt: convertPragma,
    attach_database_stmt: convertAttach,
    create_index_stmt: convertCreateIndex,
    vacuum_stmt: () => callExpression(identifier('vacuum'), []),
    truncate_stmt: ({tables}) => callExpression(identifier('truncate'), tables.items.map(({name}) => identifier(name))),
    detach_database_stmt: ({schema}) => callExpression(identifier('detach'), [
        identifier(schema.name),
    ]),
};
