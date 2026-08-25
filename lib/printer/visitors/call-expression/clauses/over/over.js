import {types} from '@putout/babel';

const {isIdentifier} = types;

export const over = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [func] = args;
    const clauses = args.slice(1);
    
    traverse(func);
    
    if (clauses.length && isIdentifier(clauses[0].node)) {
        write(' OVER ');
        traverse(clauses[0]);
        
        return;
    }
    
    write(' OVER (');
    
    for (const [i, clause] of clauses.entries()) {
        if (i > 0)
            write(' ');
        
        traverse(clause);
    }
    
    write(')');
};
