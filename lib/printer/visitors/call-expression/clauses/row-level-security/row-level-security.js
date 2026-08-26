export const enableRowLevelSecurity = (path, {write}) => {
    write('ENABLE ROW LEVEL SECURITY');
};

export const disableRowLevelSecurity = (path, {write}) => {
    write('DISABLE ROW LEVEL SECURITY');
};
