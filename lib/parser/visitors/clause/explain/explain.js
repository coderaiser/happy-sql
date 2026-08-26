import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {identifier, callExpression} = types;

export const convertExplain = (stmt) => {
    const inner = convertClause(stmt.statement);
    
    if (stmt.analyzeKw)
        return callExpression(identifier('explainAnalyze'), [inner]);
    
    if (stmt.queryPlanKw)
        return callExpression(identifier('explainQueryPlan'), [inner]);
    
    return callExpression(identifier('explain'), [inner]);
};
