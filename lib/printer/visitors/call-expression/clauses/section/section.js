export const section = (path, {write, traverse}) => {
    const [name, stmt] = path.get('arguments');
    write(`-- ${name.node.value}\n`);
    traverse(stmt);
    write(';');
};
