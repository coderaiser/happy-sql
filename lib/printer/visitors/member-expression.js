const isStar = ({value}) => value === '*';

export const MemberExpression = (path, {write, traverse}) => {
    const {computed, property} = path.node;
    const isSubscript = computed && !isStar(property);
    
    traverse(path.get('object'));
    
    if (isSubscript) {
        write('[');
        traverse(path.get('property'));
        write(']');
        
        return;
    }
    
    write('.');
    traverse(path.get('property'));
};
