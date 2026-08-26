export const explainQueryPlan = (path, {write, traverse}) => {
    write('EXPLAIN QUERY PLAN ');
    traverse(path.get('arguments')[0]);
};
