const equalType = (a) => ({type}) => type === a;

export const findClause = (clauses, type) => clauses.find(equalType(type));
