[
    select(
        id,
        from(
            t,
            where(
                x === (1 + 2) * 3,
            ),
        ),
    ),
];
