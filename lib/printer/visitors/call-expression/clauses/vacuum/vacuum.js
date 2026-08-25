export const vacuum = (path, {write, traverse}) => {
    const args = path.get('arguments');

    write('VACUUM');

    if (args.length > 0) {
        write(' INTO ');
        traverse(args[0]);
    }
};
