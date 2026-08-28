import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';
import {convertTableConstraint} from '../table-constraint.js';

const {identifier, callExpression} = types;

const convertAddColumn = (action) => callExpression(identifier('addColumn'), [
    convertColumnDefinition(action.column),
]);

const convertRenameTable = (action) => callExpression(identifier('renameTable'), [
    identifier(action.newName.name),
]);

const convertAddConstraint = ({name, constraint}) => {
    const node = convertTableConstraint(constraint);
    const args = [];
    
    if (name)
        args.push(callExpression(identifier('constraint'), [
            identifier(name.name.name),
            node,
        ]));
    else
        args.push(node);
    
    return callExpression(identifier('addConstraint'), args);
};

const convertDropColumn = (action) => callExpression(identifier('dropColumn'), [
    identifier(action.column.name),
]);

const convertRenameColumn = (action) => callExpression(identifier('renameColumn'), [
    identifier(action.oldName.name),
    identifier(action.newName.name),
]);

const convertAlterColumnType = (action) => callExpression(identifier('alterColumnType'), [
    identifier(action.column.name),
    identifier(action.action.dataType.name),
]);

const ACTION_CONVERTERS = {
    alter_action_add_column: convertAddColumn,
    alter_action_drop_column: convertDropColumn,
    alter_action_rename_column: convertRenameColumn,
    alter_action_alter_column: convertAlterColumnType,
    alter_action_rename: convertRenameTable,
    alter_action_add_constraint: convertAddConstraint,
    alter_action_enable: () => callExpression(identifier('enableRowLevelSecurity'), []),
    alter_action_disable: () => callExpression(identifier('disableRowLevelSecurity'), []),
};

export const convertAlterTable = ({table, actions}) => {
    const args = [
        identifier(table.name),
    ];
    
    for (const action of actions.items)
        args.push(ACTION_CONVERTERS[action.type](action));
    
    return callExpression(identifier('alterTable'), args);
};
