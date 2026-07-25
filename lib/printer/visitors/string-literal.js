export const StringLiteral = (path, {write}) => {
    if (path.node.value === '*' || path.node.value.startsWith(':')) {
        write(path.node.value);
        return;
    }
    write(`'${path.node.value}'`);
};
