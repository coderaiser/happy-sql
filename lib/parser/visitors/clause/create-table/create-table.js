import {types} from '@putout/babel';
import {convertColumnDefinition} from '#parser/clause/column-definition';
import {convertClause} from '#parser/clause';

const {
    identifier,
    callExpression,
    arrayExpression,
} = types;

const isAsClause = ({type}) => type === 'as_clause';
const isVirtual = (stmt) => stmt.kind && stmt.kind.kindKw.name === 'VIRTUAL';
const isColumnDefinition = ({type}) => type === 'column_definition';

const convertConstraintColumn = (item) => {
    if (item.expr)
        return identifier(item.expr.name);
    
    return identifier(item.name);
};

const convertConstraintColumns = ({columns}) => columns.expr.items.map(convertConstraintColumn);

const TABLE_CONSTRAINTS = {
    constraint_primary_key: (item) => callExpression(identifier('tablePrimaryKey'), convertConstraintColumns(item)),
    constraint_unique: (item) => callExpression(identifier('tableUnique'), convertConstraintColumns(item)),
};

const convertTableConstraint = (item) => {
    if (item.type === 'constraint')
        return callExpression(identifier('constraint'), [
            identifier(item.name.name.name),
            convertTableConstraint(item.constraint),
        ]);
    
    return TABLE_CONSTRAINTS[item.type](item);
};

const convertColumnListItem = (item) => {
    if (isColumnDefinition(item))
        return convertColumnDefinition(item);
    
    return convertTableConstraint(item);
};

const convertUsing = ({module}) => {
    const args = [];
    
    for (const item of module.args.expr.args.items)
        args.push(identifier(item.name));
    
    return callExpression(identifier(module.name.name), args);
};

export const convertCreateTable = (stmt) => {
    if (isVirtual(stmt)) {
        const [usingClause] = stmt.clauses;
        
        return callExpression(identifier('createVirtualTable'), [
            identifier(stmt.name.name),
            convertUsing(usingClause),
        ]);
    }
    
    const {
        name,
        columns,
        ifNotExistsKw,
        clauses,
    } = stmt;
    
    const asClause = clauses?.find(isAsClause);
    
    if (asClause)
        return callExpression(identifier('createTableAs'), [
            identifier(name.name),
            convertClause(asClause.expr),
        ]);
    
    const colNodes = columns.expr.items.map(convertColumnListItem);
    
    const tableArgs = [
        identifier(name.name),
        arrayExpression(colNodes),
    ];
    
    if (ifNotExistsKw)
        return callExpression(identifier('createTableIfNotExists'), tableArgs);
    
    return callExpression(identifier('createTable'), tableArgs);
};
