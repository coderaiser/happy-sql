import {types} from '@putout/babel';
import {convertCount, isCount} from '#parser/clause/count';
import {convertCaseWhen} from '#parser/clause/case-when';
import {convertClause} from '#parser/clause';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    booleanLiteral,
    nullLiteral,
    memberExpression,
    callExpression,
} = types;

export const convertMemberExpr = (node) => {
    const object = identifier(node.object.name);
    
    if (node.property.type === 'all_columns')
        return memberExpression(object, stringLiteral('*'), true);
    
    return memberExpression(object, identifier(node.property.name));
};

const isFuncCall = ({type}) => type === 'func_call';

const convertQuantifier = (node) => {
    const name = node.quantifierKw.name;
    const inner = node.expr.expr;
    
    if (inner.type === 'select_stmt')
        return callExpression(identifier(name), [convertClause(inner)]);
    
    const items = inner.items || [inner];
    const args = [];
    
    for (const item of items)
        args.push(convertOperand(item));
    
    return callExpression(identifier(name), args);
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
            identifier(node.right.name),
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
