import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertGrant = (stmt) => {
    const privArgs = [];

    for (const p of stmt.privileges.items)
        privArgs.push(identifier(p.privilegeKw.name));

    const tableArgs = [];

    for (const t of stmt.resource.tables.items)
        tableArgs.push(identifier(t.name));

    const roleArgs = [];

    for (const r of stmt.roles.items)
        roleArgs.push(identifier(r.name));

    return callExpression(identifier('grant'), [
        callExpression(identifier('privilege'), privArgs),
        callExpression(identifier('grantOn'), tableArgs),
        callExpression(identifier('to'), roleArgs),
    ]);
};