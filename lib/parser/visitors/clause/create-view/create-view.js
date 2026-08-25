import {types} from '@putout/babel';
import {convertClause} from '#parser/clause';

const {identifier, callExpression} = types;

const isMaterialized = (stmt) => stmt.kinds.some(({kindKw}) => kindKw.name === 'MATERIALIZED');

export const convertCreateView = (stmt) => {
    const [asClause] = stmt.clauses;
    const inner = convertClause(asClause.expr);
    const fnName = isMaterialized(stmt) ? 'createMaterializedView' : 'createView';
    
    return callExpression(identifier(fnName), [
        identifier(stmt.name.name),
        inner,
    ]);
};
