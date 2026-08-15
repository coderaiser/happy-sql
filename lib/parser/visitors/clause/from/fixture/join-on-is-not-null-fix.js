[
    select(u.id, from(t, join(u, on(isNotNull(u.x))))),
];
