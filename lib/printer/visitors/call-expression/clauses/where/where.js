import {isJsonTuple, printJsonTuple} from '../json-op.js';

export const where = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('WHERE ');
    
    if (isJsonTuple(args[0].node))
        return printJsonTuple(args[0], {write, traverse});
    
    traverse(args[0]);
};
