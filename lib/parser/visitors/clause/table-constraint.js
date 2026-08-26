import {types} from '@putout/babel';

const {identifier, callExpression} = types;

export const convertConstraintColumn = (item) => {
    if (item.expr)
        return identifier(item.expr.name);
    
    return identifier(item.name);
};

const convertConstraintColumns = ({columns}) => columns.expr.items.map(convertConstraintColumn);

export const TABLE_CONSTRAINTS = {
    constraint_primary_key: (item) => callExpression(identifier('tablePrimaryKey'), convertConstraintColumns(item)),
    constraint_unique: (item) => callExpression(identifier('tableUnique'), convertConstraintColumns(item)),
};

export const convertTableConstraint = (item) => {
    if (item.type === 'constraint')
        return callExpression(identifier('constraint'), [
            identifier(item.name.name.name),
            convertTableConstraint(item.constraint),
        ]);
    
    return TABLE_CONSTRAINTS[item.type](item);
};
