[
    select(u.id, from(t, join(u, on(inList(u.id, 1, 2, 3))))),
];
