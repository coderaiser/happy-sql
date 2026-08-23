import {isJsonTuple, printJsonTuple} from './call-expression/clauses/json-op.js';

export const ArrayExpression = (path, printer) => {
    const {write, traverse} = printer;
    
    if (isJsonTuple(path.node))
        return printJsonTuple(path, printer);
    
    const elements = path.get('elements');
    const n = elements.length - 1;
    
    for (const [i, el] of elements.entries()) {
        traverse(el);
        
        if (i < n) {
            write.newline();
            write.newline();
        }
    }
};
