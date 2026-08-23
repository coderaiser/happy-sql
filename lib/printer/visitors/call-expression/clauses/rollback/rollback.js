export const rollback = (path, {write}) => {
    write('ROLLBACK');
};
