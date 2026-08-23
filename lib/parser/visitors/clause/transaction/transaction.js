import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertBegin = () => callExpression(identifier('begin'), []);

export const convertCommit = () => callExpression(identifier('commit'), []);

export const convertRollback = (stmt) => {
    if (stmt.savepoint)
        return callExpression(identifier('rollbackTo'), [
            identifier(stmt.savepoint.savepoint.name),
        ]);
    
    return callExpression(identifier('rollback'), []);
};

export const convertSavepoint = (stmt) => callExpression(identifier('savepoint'), [
    identifier(stmt.savepoint.name),
]);
