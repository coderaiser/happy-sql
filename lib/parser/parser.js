import {parse} from 'sql-parser-cst';
import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {
    identifier,
    stringLiteral,
    callExpression,
    arrayExpression,
    expressionStatement,
    file,
    program,
} = types;

const getSectionName = (leading) => {
    const comment = leading?.find((c) => c.text.startsWith('-- @'));
    return comment ? comment.text.slice(2).trim() : null;
};

const wrapSection = (stmtNode, sectionName) => {
    if (!sectionName)
        return stmtNode;
    
    return callExpression(identifier('section'), [
        stringLiteral(sectionName),
        stmtNode,
    ]);
};

export const parseSqlNode = (source) => {
    const cst = parse(source, {
        dialect: 'sqlite',
        paramTypes: [':name'],
        includeRange: true,
        includeComments: true,
    });
    
    const elements = [];
    
    for (let i = 0; i < cst.statements.length; i++) {
        const stmt = cst.statements[i];
        
        if (stmt.type === 'empty_stmt')
            continue;
        
        const stmtNode = convertClause(stmt);
        const leading = i === 0 ? cst.leading : stmt.leading;
        elements.push(wrapSection(stmtNode, getSectionName(leading)));
    }
    
    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
};
