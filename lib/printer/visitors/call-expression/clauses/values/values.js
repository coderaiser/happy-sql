import {types} from '@putout/babel';

const {isStringLiteral} = types;

export const values = (path, {write, traverse}) => {
    const args = path.get('arguments');
    write('VALUES (');
    for (let i = 0; i < args.length; i++) {
        if (i > 0)
            write(', ');
        const arg = args[i];
        if (isStringLiteral(arg.node))
            write(`'${arg.node.value}'`);
        else
            traverse(arg);
    }
    write(')');
};
