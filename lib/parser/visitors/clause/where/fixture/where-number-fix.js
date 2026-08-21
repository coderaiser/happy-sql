[
    select(
        '*',
        from(
            t,
            where(
                id === 42
            )
        )
    ),
];
