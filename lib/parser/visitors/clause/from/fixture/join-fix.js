[
    select(bin.id, from(as(
        BinaryExpression,
        bin,
    ), join(as(Identifier, nan_id), on(nan_id.parent_id === bin.id && nan_id.name === 'NaN')))),
];
