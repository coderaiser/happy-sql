import {parse} from 'sql-parser-cst';
import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {arrayExpression, expressionStatement, file, program} = types;

export const parseSqlNode = (source) => {
    const cst = parse(source, {
        dialect: 'sqlite',
        paramTypes: [':name'],
        includeRange: true,
    });

    const elements = cst.statements.map(convertClause);

    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
};
