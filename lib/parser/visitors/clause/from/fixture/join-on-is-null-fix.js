[
    select(u.id, from(t, join(u, on(isNull(u.x))))),
];
