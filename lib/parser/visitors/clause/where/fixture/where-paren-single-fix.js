[
    select(
        id,
        from(
            t,
            where(
                a === 1,
            ),
        ),
    ),
];
