import {types} from '@putout/babel';

const {identifier, callExpression} = types;

const getDataType = (dataType) => {
    if (dataType.type === 'identifier')
        return dataType;
    
    return dataType.name;
};

const isSerial = (dataType) => getDataType(dataType).name === 'SERIAL';

const convertGenerated = (constraint) => {
    const kws = [];
    
    for (const kw of constraint.generatedKw)
        kws.push(kw.name);
    
    if (kws.includes('DEFAULT'))
        return callExpression(identifier('identityByDefault'), []);
    
    return callExpression(identifier('identity'), []);
};

const convertDefault = (constraint) => {
    const {expr} = constraint;
    
    if (expr.type !== 'func_call' || expr.name.name !== 'nextval')
        return null;
    
    const seqName = expr.args.expr.args.items[0].value;
    return callExpression(identifier('nextval'), [identifier(seqName)]);
};

const CONSTRAINT_VISITORS = {
    constraint_primary_key: () => callExpression(identifier('primaryKey'), []),
    constraint_generated: convertGenerated,
    constraint_not_null: () => null,
    constraint_default: convertDefault,
};

const convertConstraint = (constraint) => {
    const visitor = CONSTRAINT_VISITORS[constraint.type];
    
    if (visitor)
        return visitor(constraint);
    
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
    
    for (const constraint of constraints) {
        const node = convertConstraint(constraint);
        
        if (node)
            args.push(node);
    }
    
    return callExpression(identifier('column'), args);
};
