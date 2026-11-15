export const isNull = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    write(' IS NULL');
};

export const isNotNull = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    write(' IS NOT NULL');
};

export const is = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    write(' IS ');
    traverse(args[1]);
};

export const isNot = (path, {write, traverse}) => {
    const args = path.get('arguments');
    traverse(args[0]);
    write(' IS NOT ');
    traverse(args[1]);
};
