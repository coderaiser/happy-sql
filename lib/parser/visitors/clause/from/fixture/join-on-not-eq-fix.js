[
    select(bin.id, from(as(
        BinaryExpression,
        bin,
    ), join(as(Identifier, arg_id), on(arg_id.parent_id === bin.id && arg_id.id !== bin.id)))),
];
