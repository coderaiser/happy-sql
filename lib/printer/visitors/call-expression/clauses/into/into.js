import {types} from '@putout/babel';

const {isTSAsExpression} = types;

const printTable = (table, {write, traverse}) => {
    if (isTSAsExpression(table.node)) {
        traverse(table.get('expression'));
        write(` AS ${table.node.typeAnnotation.literal.value}`);
        
        return;
    }
    
    traverse(table);
};

export const into = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [table] = args;
    
    write('INTO ');
    printTable(table, {
        write,
        traverse,
    });
    
    // no column list: INTO t VALUES (...) / INTO t DEFAULT VALUES
    if (args.length === 2) {
        write.space();
        traverse(args[1]);
        
        return;
    }
    
    const [, columns] = args;
    const values = args[2];
    
    write(' (');
    
    if (columns.node.type === 'ArrayExpression') {
        const colArgs = columns.get('elements');
        
        for (let i = 0; i < colArgs.length; i++) {
            if (i > 0)
                write(', ');
            
            traverse(colArgs[i]);
        }
    } else {
        traverse(columns);
    }
    
    write(')');
    
    if (values) {
        write.space();
        traverse(values);
    }
};
