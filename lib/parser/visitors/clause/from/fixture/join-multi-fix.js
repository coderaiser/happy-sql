[
    select(bin.id, arg_id.name, from(as(
        BinaryExpression,
        bin,
    ), join(as(Identifier, nan_id), on(nan_id.parent_id === bin.id)), join(as(Identifier, arg_id), on(arg_id.parent_id === bin.id)))),
];
