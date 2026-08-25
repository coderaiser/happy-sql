export const unaryMinus = (path, {write, traverse}) => {
    write('-');
    traverse(path.get('arguments')[0]);
};
