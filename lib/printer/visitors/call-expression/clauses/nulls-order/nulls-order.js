export const nullsFirst = (path, {write, traverse}) => {
    traverse(path.get('arguments')[0]);
    write(' NULLS FIRST');
};

export const nullsLast = (path, {write, traverse}) => {
    traverse(path.get('arguments')[0]);
    write(' NULLS LAST');
};
