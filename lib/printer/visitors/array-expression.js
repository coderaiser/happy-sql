import {types} from '@putout/babel';
import {isJsonTuple, printJsonTuple} from './call-expression/clauses/json-op.js';

const {isCallExpression} = types;

const isSection = ({node}) => isCallExpression(node) && node.callee.name === 'section';

export const ArrayExpression = (path, printer) => {
    const {write, traverse} = printer;
    
    if (isJsonTuple(path.node))
        return printJsonTuple(path, printer);
    
    const elements = path.get('elements');
    const n = elements.length - 1;
    const isStatements = n && path.parentPath.isExpressionStatement();
    
    for (const [i, el] of elements.entries()) {
        traverse(el);
        
        if (isStatements && !isSection(el))
            write(';');
        
        if (i < n) {
            write.newline();
            write.newline();
        }
    }
};
