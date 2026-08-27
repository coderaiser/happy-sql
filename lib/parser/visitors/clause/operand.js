import {types} from '@putout/babel';
import {convertCount, isCount} from '#parser/clause/count';
import {convertCaseWhen} from '#parser/clause/case-when';
import {convertClause} from '#parser/clause';
import {convertBinary} from '#parser/clause/binary';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    booleanLiteral,
    nullLiteral,
    memberExpression,
    callExpression,
} = types;

const isString = (a) => typeof a === 'string';

export const convertMemberExpr = (node) => {
    const object = identifier(node.object.name);
    
    if (node.property.type === 'all_columns')
        return memberExpression(object, stringLiteral('*'), true);
    
    if (node.property.type === 'array_subscript')
        return memberExpression(object, convertOperand(node.property.expr), true);
    
    return memberExpression(object, identifier(node.property.name));
};

const isFuncCall = ({type}) => type === 'func_call';

const getDataTypeName = ({name}) => {
    if (isString(name))
        return name;
    
    return name.text;
};

const isArrayDataType = ({type}) => type === 'array_data_type';

const convertDataType = (dataType) => {
    if (!isArrayDataType(dataType))
        return identifier(getDataTypeName(dataType));
    
    return callExpression(identifier('arrayType'), [
        identifier(getDataTypeName(dataType.dataType)),
    ]);
};

const convertQuantifier = (node) => {
    const {name} = node.quantifierKw;
    const inner = node.expr.expr;
    
    if (inner.type === 'select_stmt')
        return callExpression(identifier(name), [
            convertClause(inner),
        ]);
    
    const items = inner.items || [inner];
    const args = [];
    
    for (const item of items)
        args.push(convertOperand(item));
    
    return callExpression(identifier(name), args);
};

const convertPrefix = (node) => {
    const {operator} = node;
    const name = operator.name || operator;
    
    if (name === 'EXISTS')
        return callExpression(identifier('exists'), [
            convertClause(node.expr.expr),
        ]);
    
    if (name === 'NOT')
        return callExpression(identifier('not'), [
            convertOperand(node.expr),
        ]);
    
    return callExpression(identifier('unaryMinus'), [
        convertOperand(node.expr),
    ]);
};

export const convertOperand = (node) => {
    if (isCount(node))
        return convertCount(node);
    
    if (isFuncCall(node)) {
        const lower = node.name.name.toLowerCase();
        const {items} = node.args.expr.args;
        
        return callExpression(identifier(lower), items.map(convertOperand));
    }
    
    if (node.type === 'case_expr')
        return convertCaseWhen(node);
    
    if (node.type === 'member_expr')
        return convertMemberExpr(node);
    
    if (node.type === 'array_literal_expr') {
        const args = [];
        
        for (const item of node.expr.expr.items)
            args.push(convertOperand(item));
        
        return callExpression(identifier('array'), args);
    }
    
    if (node.type === 'quantifier_expr')
        return convertQuantifier(node);
    
    if (node.type === 'cast_operator_expr')
        return callExpression(identifier('pgCast'), [
            convertOperand(node.left),
            convertDataType(node.right),
        ]);
    
    if (node.type === 'binary_expr')
        return convertBinary(node);
    
    if (node.type === 'prefix_op_expr')
        return convertPrefix(node);
    
    if (node.type === 'paren_expr' && node.expr.type === 'select_stmt')
        return callExpression(identifier('subquery'), [
            convertClause(node.expr),
        ]);
    
    if (node.type === 'parameter')
        return stringLiteral(node.text);
    
    if (node.type === 'number_literal')
        return numericLiteral(node.value);
    
    if (node.type === 'string_literal')
        return stringLiteral(node.value);
    
    if (node.type === 'boolean_literal')
        return booleanLiteral(node.value);
    
    if (node.type === 'null_literal')
        return nullLiteral(node.value);
    
    return identifier(node.name);
};
