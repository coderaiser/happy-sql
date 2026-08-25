import {types} from '@putout/babel';

const {isAssignmentExpression} = types;

export const withNamed = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const namedQueries = args.filter(({node}) => isAssignmentExpression(node));
    const finalStatement = args.at(-1);
    const last = namedQueries.length - 1;
    
    write('WITH ');
    
    for (const [i, query] of namedQueries.entries()) {
        write(query.get('left').node.name);
        write(' AS (');
        traverse(query.get('right'));
        write(')');
        
        if (i < last)
            write(', ');
        
        write.newline();
    }
    
    traverse(finalStatement);
};
