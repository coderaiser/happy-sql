export const fetchFirst = (path, {write, traverse}) => {
    write('FETCH FIRST ');
    traverse(path.get('arguments')[0]);
    write(' ROWS ONLY');
};
