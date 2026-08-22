export const cast = (path, {write, traverse}) => {
    const [expr, typeArg] = path.get('arguments');
    
    write('CAST(');
    traverse(expr);
    write(' AS ');
    traverse(typeArg);
    write(')');
};
