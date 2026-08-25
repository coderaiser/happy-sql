export const explain = (path, {write, traverse}) => {
    write('EXPLAIN ');
    traverse(path.get('arguments')[0]);
};