const JS_TO_SQL_OP = {
    '===': '=',
    '!==': '!=',
};

export const BinaryExpression = (path, {write, traverse}) => {
    traverse(path.get('left'));
    const op = path.node.operator;
    write(` ${JS_TO_SQL_OP[op] ?? op} `);
    traverse(path.get('right'));
};
