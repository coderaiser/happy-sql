import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {identifier, callExpression} = types;

export const convertExplain = (stmt) => {
    const inner = convertClause(stmt.statement);
    const fnName = stmt.analyzeKw ? 'explainAnalyze' : 'explain';
    
    return callExpression(identifier(fnName), [inner]);
};
