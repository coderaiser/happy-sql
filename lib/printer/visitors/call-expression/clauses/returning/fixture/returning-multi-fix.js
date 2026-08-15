[
    insert(into(t, x, values(':x')), returning(id, created_at)),
];
