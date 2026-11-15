[
    select(id, from(t, where(not(a === 1 && b === 2)))),
];
