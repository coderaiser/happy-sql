export const explainAnalyze = (path, {write, traverse}) => {
    write('EXPLAIN ANALYZE ');
    traverse(path.get('arguments')[0]);
};