export const from = (path, {write, traverse}) => {
    const args = path.get('arguments');

    write('FROM ');
    traverse(args[0]);

    for (let i = 1; i < args.length; i++)
        traverse(args[i]);
};
