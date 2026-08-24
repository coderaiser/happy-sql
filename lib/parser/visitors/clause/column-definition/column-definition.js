import {types} from '@putout/babel';
import {convertBinary} from '#parser/clause/binary';

const {
    identifier,
    callExpression,
    numericLiteral,
    stringLiteral,
    nullLiteral,
    booleanLiteral,
} = types;

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

const convertDefault = ({expr}) => {
    if (expr.type === 'func_call' && expr.name.name === 'nextval') {
        const seqName = expr.args.expr.args.items[0].value;
        
        return callExpression(identifier('nextval'), [
            identifier(seqName),
        ]);
    }
    
    if (expr.type === 'number_literal')
        return callExpression(identifier('default_'), [
            numericLiteral(expr.value),
        ]);
    
    if (expr.type === 'string_literal')
        return callExpression(identifier('default_'), [
            stringLiteral(expr.value),
        ]);
    
    if (expr.type === 'null_literal')
        return callExpression(identifier('default_'), [
            nullLiteral(),
        ]);
    
    if (expr.type === 'boolean_literal')
        return callExpression(identifier('default_'), [
            booleanLiteral(expr.value),
        ]);
    
    return null;
};

const convertUnique = () => callExpression(identifier('unique'), []);

const convertCheck = (constraint) => callExpression(identifier('check'), [
    convertBinary(constraint.expr.expr),
]);

const convertReferences = (constraint) => {
    const refTable = identifier(constraint.table.name);
    const cols = constraint.columns.expr.items;
    const args = [refTable];
    
    for (const col of cols)
        args.push(identifier(col.name));
    
    return callExpression(identifier('references'), args);
};

const CONSTRAINT_VISITORS = {
    constraint_primary_key: () => callExpression(identifier('primaryKey'), []),
    constraint_generated: convertGenerated,
    constraint_not_null: () => callExpression(identifier('notNull'), []),
    constraint_default: convertDefault,
    constraint_unique: convertUnique,
    constraint_check: convertCheck,
    references_specification: convertReferences,
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
