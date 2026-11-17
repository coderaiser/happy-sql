import {types} from '@putout/babel';
import {printBlock} from '../create-trigger/create-trigger.js';

const {isCallExpression} = types;

const isOrReplace = ({node}) => isCallExpression(node) && node.callee.name === 'orReplace';

export const createFunction = (path, printer) => {
    const {write, traverse} = printer;
    const [
        name,
        returns,
        language,
        ...rest
    ] = path.get('arguments');
    
    const body = rest.at(-1);
    
    write('CREATE ');
    
    if (rest.slice(0, -1).some(isOrReplace))
        write('OR REPLACE ');
    
    write('FUNCTION ');
    traverse(name);
    write('()');
    write.newline();
    write('RETURNS ');
    traverse(returns.get('arguments.0'));
    write.newline();
    write('LANGUAGE ');
    traverse(language.get('arguments.0'));
    write.newline();
    write('AS $$');
    write.newline();
    printBlock(body, printer);
    write(';');
    write.newline();
    write('$$');
};
