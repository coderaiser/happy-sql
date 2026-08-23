export const isDistinctFrom = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    traverse(args[0]);
    write(' IS DISTINCT FROM ');
    traverse(args[1]);
};
