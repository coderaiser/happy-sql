export const printTableBody = (path, {write, traverse}) => {
    const [name, columns] = path.get('arguments');
    
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

export const createTable = (path, printer) => {
    printer.write('CREATE TABLE ');
    printTableBody(path, printer);
};
