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
    if (!leading)
        return null;
    
    const comment = leading.find((c) => c.text.startsWith('-- @'));
    
    return comment ? comment.text
        .slice(2)
        .trim() : null;
};

export const parseSqlNode = (source) => {
    const cst = parse(source, {
        dialect: 'postgresql',
        paramTypes: [':name'],
        includeRange: true,
        includeComments: true,
    });
    
    const elements = [];
    let currentSection = null;
    const sectionGroups = new Map();
    
    for (const [i, stmt] of cst.statements.entries()) {
        if (stmt.type === 'empty')
            continue;
        
        const stmtNode = convertClause(stmt);
        const leading = i ? stmt.leading : cst.leading;
        const name = getSectionName(leading);
        
        if (name)
            currentSection = name;
        
        if (currentSection) {
            if (!sectionGroups.has(currentSection))
                sectionGroups.set(currentSection, []);
            
            sectionGroups.get(currentSection).push(stmtNode);
        } else {
            elements.push(stmtNode);
        }
    }
    
    for (const [name, nodes] of sectionGroups) {
        const inner = nodes.length === 1
            ? nodes[0]
            : arrayExpression(nodes);
        
        elements.push(callExpression(identifier('section'), [stringLiteral(name), inner]));
    }
    
    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
};
