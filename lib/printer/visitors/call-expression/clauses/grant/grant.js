export const grant = (path, {write, traverse}) => {
    const [privArg, onArg, toArg] = path.get('arguments');
    
    write('GRANT ');
    traverse(privArg);
    write(' ON ');
    traverse(onArg);
    write(' TO ');
    traverse(toArg);
};
