export const exists = (path, {write, traverse}) => {
    write('EXISTS (');
    traverse(path.get('arguments')[0]);
    write(')');
};
