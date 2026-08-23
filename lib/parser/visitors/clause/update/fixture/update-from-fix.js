[
    update(
        t,
        set(
            x === 1,
        ),
        updateFrom(
            u,
        ),
        where(
            t.id === u.id,
        ),
    ),
];
