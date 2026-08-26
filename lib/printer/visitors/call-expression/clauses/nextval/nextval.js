export const nextval = (path, {write}) => {
    const [seq] = path.node.arguments;
    
    if (seq.type === 'StringLiteral') {
        write(`nextval('${seq.value}')`);
        return;
    }
    
    write(`DEFAULT nextval('${seq.name}')`);
};
