[
    withNamed(call = insert(into(
        CallExpression,
        [file, parent_id],
        values(':file', ':parent_id'),
    ), returning(id)), member = insert(into(
        MemberExpression,
        [file, parent_id],
        select(':file', id, from(call)),
    ), returning(id)), insert(into(Identifier, [file, name, parent_id], select(':file', 'isNaN', id, from(member))))),
];
