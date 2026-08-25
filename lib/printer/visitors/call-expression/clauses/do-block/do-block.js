export const doBlock = (path, {write}) => {
    const [arg] = path.get('arguments');

    write(`DO $$${arg.node.value}$$`);
};