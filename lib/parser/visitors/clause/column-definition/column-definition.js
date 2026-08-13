import {types} from '@putout/babel';

const {identifier, callExpression} = types;

const getDataType = (dataType) => {
    if (dataType.type === 'identifier')
        return dataType;
    
    return dataType.name;
};

const isSerial = (dataType) => getDataType(dataType).name === 'SERIAL';

const convertConstraint = (constraint) => {
    if (constraint.type === 'constraint_primary_key')
        return callExpression(identifier('primaryKey'), []);
    
    return callExpression(identifier('autoIncrement'), []);
};

export const convertColumnDefinition = (column) => {
    const {
        name,
        dataType,
        constraints,
    } = column;
    
    const args = [
        identifier(name.name),
    ];
    
    if (isSerial(dataType))
        args.push(callExpression(identifier('serial'), []));
    else
        args.push(identifier(getDataType(dataType).text));
    
    for (const constraint of constraints)
        args.push(convertConstraint(constraint));
    
    return callExpression(identifier('column'), args);
};
