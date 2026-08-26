[
    select(a, from(t, where(like(b, 'x%', '!')))),
];