[
    insert(
        into(
            t,
            a,
            values(
                1,
            ),
        ),
        onConflict(
            a,
            where(
                b > 0,
            ),
            set(
                a === EXCLUDED.a,
            ),
        ),
    ),
];
