import {types} from '@putout/babel';

const {
    isArrayExpression,
    isCallExpression,
} = types;

const isOption = (name) => ({node}) => isCallExpression(node) && node.callee.name === name;

const getWords = (name) => name
    .replace(/([A-Z])/g, ' $1')
    .toUpperCase()
    .split(' ');

const printEvent = (path, {write, traverse}) => {
    const [table, ...columns] = path.get('arguments');
    const [event, ...time] = getWords(path.node.callee.name).reverse();
    
    write(`${time
        .reverse()
        .join(' ')} ${event}`);
    
    if (columns.length) {
        write(' OF ');
        
        for (const [i, column] of columns.entries()) {
            if (i > 0)
                write(', ');
            
            traverse(column);
        }
    }
    
    write(' ON ');
    traverse(table);
};

const printExecute = (path, {write, traverse}) => {
    const [name, ...args] = path.get('arguments');
    
    write('EXECUTE FUNCTION ');
    traverse(name);
    write('(');
    
    for (const [i, arg] of args.entries()) {
        if (i > 0)
            write(', ');
        
        traverse(arg);
    }
    
    write(')');
};

export const printBlock = (path, {write, indent, traverse}) => {
    write('BEGIN');
    write.newline();
    
    for (const statement of path.get('elements')) {
        indent.inc();
        indent();
        traverse(statement);
        indent.dec();
        write(';');
        write.newline();
    }
    
    write('END');
};

export const createTrigger = (path, printer) => {
    const {write, traverse} = printer;
    const [name, event, ...rest] = path.get('arguments');
    const body = rest.at(-1);
    const options = rest.slice(0, -1);
    const whenOption = options.find(isOption('when'));
    
    write('CREATE TRIGGER ');
    
    if (options.some(isOption('ifNotExists')))
        write('IF NOT EXISTS ');
    
    traverse(name);
    write(' ');
    printEvent(event, printer);
    
    if (options.some(isOption('forEachRow'))) {
        write.newline();
        write('FOR EACH ROW');
    }
    
    if (whenOption) {
        write.newline();
        write('WHEN ');
        traverse(whenOption.get('arguments.0'));
    }
    
    write.newline();
    
    if (isArrayExpression(body.node))
        return printBlock(body, printer);
    
    printExecute(body, printer);
};
