import {types} from '@putout/babel';

const {isCallExpression} = types;

const isConcurrently = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'concurrently';
const isIfNotExists = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'ifNotExists';
const isWhere = (arg) => isCallExpression(arg.node) && arg.node.callee.name === 'where';
const isCol = (arg) => !isConcurrently(arg) && !isIfNotExists(arg) && !isWhere(arg);

export const printIndexBody = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [name, table, ...rest] = args;
    const cols = rest.filter(isCol);
    const hasIfNotExists = rest.some(isIfNotExists);
    const hasConcurrently = rest.some(isConcurrently);
    const whereArg = rest.find(isWhere);

    if (hasIfNotExists)
        write('IF NOT EXISTS ');

    if (hasConcurrently)
        write('CONCURRENTLY ');

    traverse(name);
    write(' ON ');
    traverse(table);
    write(' (');

    for (const [i, col] of cols.entries()) {
        if (i > 0)
            write(', ');

        traverse(col);
    }

    write(')');

    if (whereArg) {
        write.newline();
        traverse(whereArg);
    }
};

export const createIndex = (path, printer) => {
    printer.write('CREATE INDEX ');
    printIndexBody(path, printer);
};
