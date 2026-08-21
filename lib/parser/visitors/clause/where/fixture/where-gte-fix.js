[
    select(
        '*',
        from(
            t,
            where(
                x >= 1,
            ),
        ),
    ),
];
