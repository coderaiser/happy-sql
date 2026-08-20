export const createTable = (path, {write, traverse}) => {
    const [name, columns] = path.get('arguments');
    
    write('CREATE TABLE ');
    traverse(name);
    write.space();
    write('(');
    write.newline();
    
    const elements = columns.get('elements');
    
    for (const [i, element] of elements.entries()) {
        if (i > 0) {
            write(',');
            write.newline();
        }
        
        traverse(element);
    }
    
    write(')');
};
