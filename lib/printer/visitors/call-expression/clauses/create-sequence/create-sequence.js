export const createSequence = (path, {write, traverse}) => {
    write('CREATE SEQUENCE ');
    traverse(path.get('arguments')[0]);
};
