import {tryCatch} from 'try-catch';
import {parse as parseCst} from 'sql-parser-cst';
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

const DIALECTS = [
    'postgresql',
    'sqlite',
];

const parseCstDialect = (source, dialect) => parseCst(source, {
    dialect,
    paramTypes: [':name'],
    includeRange: true,
    includeComments: true,
});

export const parseSql = (source) => {
    let cst;
    let error;
    
    for (const dialect of DIALECTS) {
        [error, cst] = tryCatch(parseCstDialect, source, dialect);
        
        if (cst)
            return convertSource(cst);
    }
    
    throw error;
};

const isComment = ({text}) => text.startsWith('-- @');

const getSectionName = (leading) => {
    if (!leading)
        return null;
    
    const comment = leading.find(isComment);
    
    return comment ? comment.text
        .slice(2)
        .trim() : null;
};

const convertSource = (cst) => {
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
        const inner = nodes.length === 1 ? nodes[0] : arrayExpression(nodes);
        
        elements.push(callExpression(identifier('section'), [
            stringLiteral(name),
            inner,
        ]));
    }
    
    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
};

