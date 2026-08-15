export const nextval = (path, {write, traverse}) => {
    write(`nextval('`);
    traverse(path.get('arguments')[0]);
    write(`')`);
};
