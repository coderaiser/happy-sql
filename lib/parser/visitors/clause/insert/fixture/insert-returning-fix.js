[
    insert(into(
        CallExpression,
        parent_id,
        values(':parent_id'),
    ), returning(as(id, 'call_id'))),
];
