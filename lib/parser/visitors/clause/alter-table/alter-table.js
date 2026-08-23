import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';

const {identifier, callExpression} = types;

const convertAddColumn = (action) => callExpression(identifier('addColumn'), [
    convertColumnDefinition(action.column),
]);

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
};

export const convertAlterTable = ({table, actions}) => {
    const args = [
        identifier(table.name),
    ];
    
    for (const action of actions.items)
        args.push(ACTION_CONVERTERS[action.type](action));
    
    return callExpression(identifier('alterTable'), args);
};
