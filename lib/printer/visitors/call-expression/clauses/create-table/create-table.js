import {types} from '@putout/babel';

const {isCallExpression} = types;

export const printTableBody = (path, {write, traverse}) => {
    const [name, columns] = path.get('arguments');
    
    traverse(name);
    write.space();
    write('(');
    write.newline();
    
    const elements = columns.get('elements');
    let wroteRowid = false;
    
    for (const [i, element] of elements.entries()) {
        const isRowid = isCallExpression(element.node) && element.node.callee.name === 'withoutRowid';
        
        if (isRowid) {
            wroteRowid = true;
            continue;
        }
        
        if (i > 0 && !wroteRowid) {
            write(',');
            write.newline();
        }
        
        traverse(element);
    }
    
    write(')');
    
    if (wroteRowid)
        write(' WITHOUT ROWID');
};

export const createTable = (path, printer) => {
    printer.write('CREATE TABLE ');
    printTableBody(path, printer);
};
