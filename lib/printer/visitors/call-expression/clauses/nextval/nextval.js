export const nextval = (path, {write}) => {
    const [seq] = path.node.arguments;
    write(`DEFAULT nextval('${seq.name}')`);
};
