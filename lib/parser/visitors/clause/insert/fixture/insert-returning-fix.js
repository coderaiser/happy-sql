[
    insert(into(CallExpression, parent_id, values(':parent_id')), returning(id as 'call_id')),
];
